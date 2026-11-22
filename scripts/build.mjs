// Rebuilds data/*.csv from the raw files in archive/. Plain Node, no dependencies.
// Usage: node scripts/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const write = (p, header, rows) => {
  const lines = [header.join(','), ...rows.map((r) => r.join(','))];
  writeFileSync(join(root, p), lines.join('\n') + '\n');
  console.log(`${p}: ${rows.length} rows`);
};

// RCSB's own grouping of experimental methods (rcsb_entry_info.experimental_method), in a fixed order.
const METHODS = ['X-ray', 'EM', 'NMR', 'Integrative', 'Multiple methods', 'Neutron', 'Other'];

// Year -> method -> count, from a Search API date_histogram facet with a nested terms facet.
function counts(path) {
  const res = JSON.parse(read(path));
  const out = new Map();
  for (const b of res.facets[0].buckets) {
    const m = new Map();
    let sum = 0;
    for (const x of b.facets[0].buckets) {
      if (!METHODS.includes(x.label)) throw new Error(`unknown method ${x.label} in ${path}`);
      m.set(x.label, x.population);
      sum += x.population;
    }
    if (sum !== b.population) throw new Error(`method counts do not add up for ${b.label} in ${path}`);
    out.set(Number(b.label), { total: b.population, m });
  }
  const total = [...out.values()].reduce((s, v) => s + v.total, 0);
  if (total !== res.total_count) throw new Error(`year counts do not add up in ${path}`);
  return out;
}

const all = counts('archive/rcsb-search-entries-by-year-method.json');
const prot = counts('archive/rcsb-search-protein-entries-by-year-method.json');
const years = [...all.keys()].sort((a, b) => a - b);
for (let y = years[0]; y <= years.at(-1); y++) if (!all.has(y)) throw new Error(`missing year ${y}`);

const byMethod = [];
for (const y of years) {
  for (const method of METHODS) {
    const e = all.get(y).m.get(method) ?? 0;
    const p = prot.get(y)?.m.get(method) ?? 0;
    byMethod.push([y, method, e, p]);
  }
}
write('data/pdb-releases-by-method.csv', ['year', 'method', 'entries', 'entries_with_protein'], byMethod);

const byYear = [];
let cumE = 0;
let cumP = 0;
for (const y of years) {
  const e = all.get(y).total;
  const p = prot.get(y)?.total ?? 0;
  cumE += e;
  cumP += p;
  byYear.push([y, e, p, cumE, cumP]);
}
write('data/pdb-releases-by-year.csv', ['year', 'entries', 'entries_with_protein', 'cumulative_entries', 'cumulative_entries_with_protein'], byYear);

// AlphaFold DB CHANGELOG: "## YYYY-MM-DD" headings, a first bullet describing the release, and a "* N structures" bullet.
const afdb = [];
for (const section of read('archive/alphafold-db-CHANGELOG.txt').split(/^## /m).slice(1)) {
  const date = section.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
  const n = section.match(/^\* ([\d,]+) structures\s*$/m)?.[1];
  const note = section.match(/^\* (.+)$/m)?.[1].trim().replace(/\.$/, '');
  if (!date || !n || !note) throw new Error(`could not parse CHANGELOG section: ${section.slice(0, 40)}`);
  afdb.push([date, Number(n.replace(/,/g, '')), `"${note.replace(/"/g, '""')}"`]);
}
afdb.sort((a, b) => a[0].localeCompare(b[0]));
write('data/alphafold-db-releases.csv', ['release_date', 'predicted_structures', 'change'], afdb);

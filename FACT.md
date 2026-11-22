# Fact for checking

Claim (README "What stands out"): In 2025, four years after AlphaFold DB opened with 365,198 predicted structures (2021-07-22), the PDB released 17,236 new experimentally determined structures containing protein, more than in any earlier year, up from 13,820 in 2020. 2026 to 18 November: 16,047.

Context numbers: AlphaFold DB 2025-09-15 release 241,070,489 predicted structures, about 933 times (933.5) the 258,244 experimental entries with protein in the PDB (cumulative to 2026-11-18). Cryo-EM (`EM`) share of new entries with protein: 41.6% in 2025 (7,162 of 17,236), 2.4% in 2015 (216 of 9,116). All PDB experimental entries: 263,567.

Recompute (from the dataset directory):

```sh
node -e "const fs=require('fs');const rd=f=>fs.readFileSync(f,'utf8').trim().split('\n').slice(1).map(l=>l.split(','));const y=rd('data/pdb-releases-by-year.csv').map(r=>r.map(Number));const m=rd('data/pdb-releases-by-method.csv');const a=rd('data/alphafold-db-releases.csv');const p=yr=>y.find(r=>r[0]===yr)[2];const em=yr=>+m.find(r=>+r[0]===yr&&r[1]==='EM')[3];const max=y.reduce((b,r)=>r[2]>b[2]?r:b);const last=y.at(-1);const af=+a.at(-1)[1];console.log({maxYear:max[0],max:max[2],y2020:p(2020),y2026:p(2026),afdbFirst:+a[0][1],afdbLatest:af,pdbProteinTotal:last[4],pdbAllTotal:last[3],ratio:(af/last[4]).toFixed(1),em2025:(100*em(2025)/p(2025)).toFixed(1),em2015:(100*em(2015)/p(2015)).toFixed(1)})"
```

Expected: maxYear 2025, max 17236, y2020 13820, y2026 16047, afdbFirst 365198, afdbLatest 241070489, pdbProteinTotal 258244, pdbAllTotal 263567, ratio 933.5, em2025 41.6, em2015 2.4.

Points to check: the "record" compares current entries by initial release year (obsoleted entries are excluded, which can only lower past years slightly; 2025's 17,236 is 1,988 above the previous high, 15,248 in 2024). The 933x ratio compares a count of predictions (roughly one per UniProt sequence) with a count of PDB entries (many per protein), so it is a scale comparison, not like-for-like.

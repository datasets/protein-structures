# Provenance

All files retrieved on 2026-11-22 with a generic User-Agent (`datasets-commons-wrangler`).

## RCSB PDB Search API

- Endpoint: https://search.rcsb.org/rcsbsearch/v2/query (POST, JSON). Docs: https://search.rcsb.org/
- `rcsb-query-entries.json`: all experimental entries with a release date, facet by year of `rcsb_accession_info.initial_release_date` and nested terms facet on `rcsb_entry_info.experimental_method`. Response saved as `rcsb-search-entries-by-year-method.json` (total_count 263,567).
- `rcsb-query-protein-entries.json`: same, restricted to `rcsb_entry_info.polymer_entity_count_protein >= 1`. Response saved as `rcsb-search-protein-entries-by-year-method.json` (total_count 258,244).
- Latest release date in the data: 2026-11-18 (entry 10BF, from https://data.rcsb.org/rest/v1/core/entry/10BF).
- Re-run: `curl -s -H 'Content-Type: application/json' https://search.rcsb.org/rcsbsearch/v2/query -d @archive/rcsb-query-entries.json` (counts will change weekly as new entries are released).

sha256:

```
ba9034975aa9964fa16426a2f3c5f33278fdb9d0c97b17f08e617f271952f26c  rcsb-query-entries.json
a8d0946f4554cc257f7b334fd8c536d1dda1650a19e9d251897ff28dace7b550  rcsb-query-protein-entries.json
8ee33e6b4e18b4f469e95dabc6e6291d7553f2841c8a0c9f80d62327033fc7c7  rcsb-search-entries-by-year-method.json
f7b454fd732df461b06c1182327dd144d8916489307b415825ce68e2e5de96dd  rcsb-search-protein-entries-by-year-method.json
```

Licence, quoted verbatim from https://www.rcsb.org/pages/usage-policy (retrieved 2026-11-22):

> The wwPDB policy states that data files contained in the PDB archive are available under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication. All data provided by RCSB PDB programmatic APIs are available under the same license.

## AlphaFold DB changelog

- URL: https://ftp.ebi.ac.uk/pub/databases/alphafold/CHANGELOG.txt (last modified 2025-10-20 on the FTP listing), saved as `alphafold-db-CHANGELOG.txt`.

sha256:

```
b6cc3567ff0cd9232c94bfdc080c2871cc27142a39ec983d97ecc26b21b59b86  alphafold-db-CHANGELOG.txt
```

Licence, quoted verbatim from the "Licence and attributions" section of https://alphafold.ebi.ac.uk/ (retrieved 2026-11-22):

> Data is available for academic and commercial use, under a CC-BY-4.0 licence. EMBL-EBI expects attribution (e.g., in publications, services, or products) for any of its online services, databases, or software in accordance with good scientific practice.

The same home page says "AlphaFold DB provides open access to over 260 million protein structure predictions"; that figure is not in the changelog and is not used in the data.

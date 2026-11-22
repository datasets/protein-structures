How many protein structures have scientists measured, how, and how does that compare with the structures AlphaFold has predicted? This dataset counts the experimentally determined structures released in the Protein Data Bank (PDB) each year from 1976 to 18 November 2026, split by experimental method (X-ray crystallography, cryo-electron microscopy, NMR and others), with running totals. Alongside it is a small table of the size of the AlphaFold Protein Structure Database (AlphaFold DB) at each release from July 2021 to September 2025. Units are counts of PDB entries and of predicted structures.

## What stands out

AlphaFold has not replaced experiments. In 2025, four years after AlphaFold DB opened with 365,198 predicted structures, the PDB released 17,236 new experimentally determined structures containing protein, more than in any earlier year and up from 13,820 in 2020. So far in 2026 (to 18 November) it has released 16,047.

For scale: AlphaFold DB's September 2025 release held 241,070,489 predicted structures, about 933 times the 258,244 experimental structures containing protein in the whole PDB. That is a big expansion in coverage, but a prediction is a computed model, not a measurement, and experimental structures are still how predictions are checked. The other shift is in how structures are measured: cryo-electron microscopy produced 41.6% of the new protein structures in 2025, against 2.4% in 2015.

## Data

- `data/pdb-releases-by-year.csv`: one row per year, 1976 to 2026. Columns: `year`; `entries` (all experimentally determined PDB entries first released that year, including the few that contain only DNA or RNA); `entries_with_protein` (those with at least one protein chain); `cumulative_entries` and `cumulative_entries_with_protein` (running totals). The PDB holds 263,567 experimental entries in all, 258,244 of them with protein.
- `data/pdb-releases-by-method.csv`: one row per year and method, with the same two counts. `method` uses RCSB's own grouping: `X-ray`, `EM` (cryo-electron microscopy, also called 3DEM), `NMR` (solution and solid-state), `Integrative` (models combining several kinds of data), `Multiple methods`, `Neutron` and `Other`. Each entry is counted once, so the methods add up to the yearly totals.
- `data/alphafold-db-releases.csv`: one row per AlphaFold DB release in its changelog. Columns: `release_date`, `predicted_structures` (the size of the database after that release) and `change` (the changelog's description of the release).

Caveats:

- 2026 is a partial year, to the PDB's weekly release of 18 November 2026.
- Counts are of entries in the PDB today, by the date each was first released. Entries later withdrawn or replaced (obsoleted) are not counted, so past years may be slightly lower than the number released at the time. The earliest release date in RCSB's records is 1976, though the PDB was founded in 1971.
- A PDB entry is one deposited structure, and many entries are of the same protein (for example bound to different drugs), so the count is not a count of distinct proteins. AlphaFold DB has roughly one predicted structure per protein sequence in UniProt, and since 2025 it also includes some protein isoforms.
- The 2025 AlphaFold DB release removed as well as added tens of millions of entries (see its changelog), so the database is not simply cumulative. The changelog does not label each release with a version number.
- AlphaFold DB's home page now says it holds "over 260 million" predictions, which seems to include collections added after the last changelog entry; this table only includes the counts stated in the changelog.

## Source and licence

PDB counts are from the RCSB Protein Data Bank Search API (search.rcsb.org), counting experimental entries by `rcsb_accession_info.initial_release_date` and `rcsb_entry_info.experimental_method`, retrieved on 22 November 2026; the queries and raw responses are kept in the repository's archive. RCSB PDB's usage policy (rcsb.org/pages/usage-policy) says PDB data, including data from its programmatic APIs, are available under the CC0 1.0 Universal Public Domain Dedication. The two `pdb-*` files are therefore CC0-1.0.

AlphaFold DB counts are from the AlphaFold DB changelog on EMBL-EBI's FTP site (ftp.ebi.ac.uk/pub/databases/alphafold/CHANGELOG.txt). AlphaFold DB is run by EMBL-EBI and Google DeepMind, and its site (alphafold.ebi.ac.uk) says its data "is available for academic and commercial use, under a CC-BY-4.0 licence". `data/alphafold-db-releases.csv` is therefore CC-BY-4.0: please credit AlphaFold DB (EMBL-EBI and Google DeepMind).

This is a frozen snapshot taken on 2026-11-22.

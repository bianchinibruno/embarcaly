# Changelog

All notable changes to this project are documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [Semantic Versioning](https://semver.org/).

## [0.2.0] — 2026-09-13

### Added

- **Rights engine** (`mobile/src/domain/direitos.ts`). Encodes ANAC Resolution
  400/2016: material assistance thresholds at 1h, 2h and 4h, the four passenger
  options above 4h, and denied-boarding compensation (250/500 SDR). Every entry
  cites its article and ships a ready-to-say sentence for the airline desk.
  Covered by 38 tests.
- **Trip chain recalculation** (`mobile/src/domain/cascata.ts`). Given a delayed
  item, computes what happened to every downstream reservation: missed
  transfers, hotels that need a heads-up, next-morning activities that became
  unviable. Covered by 18 tests.
- **Visual identity v2** (`brand/IDENTIDADE.md`). Printed-form system: greenbar
  paper, two inks, paper fibre, registration misalignment, office hardware.
  Archivo Narrow, Archivo and Courier Prime.
- **Landing page** rebuilt on the printed-form system, with waitlist form and an
  e-mail fallback that works before the form backend is configured.
- **Passenger rights guide**, an 8-page printable PDF, plus its generator.
- **Campaign artwork generator** (`marketing/gerar-artes.py`) and 37 rendered
  assets: four Instagram carousels, six Play Store screenshots, one feature
  graphic.
- **Validation plan** (`plano/`): 12 documents covering decisions, ICP,
  competitor benchmark, MVP scope, schedule, budget, go-to-market, gates and
  risks.
- **Marketing and sales playbooks** (`marketing/`, `vendas/`): six-month plan,
  26-week editorial calendar, full Play Store ASO listing, sales playbook,
  pricing and launch plan.
- `CONTINUAR.md` recording project state for session handoff.

### Changed

- Prototype moved from the repository root to `prototipo/`; the landing page now
  serves as the front door.
- Mono typeface switched from Martian Mono to Courier Prime across the system.

## [0.1.0] — 2026-09-05

### Added

- Expo / React Native app for iOS and Android with full local CRUD over SQLite.
- Navigable HTML prototype.
- Brand kit: mark, lockup, icons, favicons and manual.
- CI running typecheck, expo-doctor and bundle build.

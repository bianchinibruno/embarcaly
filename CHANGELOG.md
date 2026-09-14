# Changelog

All notable changes to this project are documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [Semantic Versioning](https://semver.org/).

## [0.3.0] — 2026-09-14

### Changed

- **Visual system v3** (`brand/IDENTIDADE.md`). Replaces the printed-paper v2 in
  full. The palette and typography are inherited from Trilha Certa Viagens and
  adapted for a product: navy `#33366A` structures, orange `#ED8426` means one
  thing only — the clock is running — and the app runs on `#1C1E3C`. The v2 is
  archived in `brand/IDENTIDADE-v2-arquivado.md`.
- **Typography.** Poppins replaces Archivo Narrow and Archivo; IBM Plex Mono
  replaces Courier Prime and Azeret Mono. Where the agency signs by hand, the
  product signs with data: every time, flight code, deadline and article of the
  regulation is set in mono with tabular figures.
- **App theme** (`mobile/src/theme/tokens.ts`). Orange text and orange fill are
  now separate tokens, because white on `#ED8426` fails contrast at 2.6:1 in
  every size; `onStamp` is the only colour allowed over the fill. The per-type
  paper tints collapse to a single surface — in v3 the reservation type is
  carried by the icon, not by the colour.
- **Situation colours** are promoted from comparison device to product state:
  green, orange and red now live on screen permanently as released, counting and
  lost. This is the one structural divergence from the agency's manual.
- **Both landings, the prototype, the brand kit, the share image, the eight-page
  rights guide and all 37 campaign pieces** rebuilt on v3. Paper fibre, punch
  holes, printer registration marks and the crooked stamp are gone: v3 is flat,
  and depth comes from the value of the navy.

### Fixed

- Button text on the landings inherited the block's orange and disappeared
  against its own orange background. The rule is now explicit in the stylesheet
  and in the manual: text over orange fill is navy, never white.
- The hero time-ruler markers were 85px tall against a 67px column of rows, so
  they drifted out of line with the rights they mark.

### Notes

- The domain, e-mail and Instagram handle are not wired in yet. Pages still
  point at `bianchinibruno.github.io/embarcaly`.
- **Open conflict.** The legal notice states that Embarcaly is not a travel
  agency. Trilha Certa Viagens is one, and both brands now share a palette and a
  typeface. The relationship between the brands has to be decided before any
  piece is signed with both. Recorded in `brand/IDENTIDADE.md`.

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

### Fixed

- Expo packages realigned with the SDK 57 patch versions expected by
  `expo-doctor`, which had drifted and was failing CI.

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

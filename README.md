# Dimmer Matrix

A lights-out puzzle with a GF(2) Gaussian-elimination solver that proves solvability and shows the minimal press set.

## What it does

- Board sizes 3×3 through 8×8
- Click-to-toggle plus-shaped neighborhoods
- Solver via Gaussian elimination over GF(2)
- Solvability check + null-space explanation for unsolvable boards
- Minimal-press solution
- Step-by-step solution playback
- Seeded random solvable puzzle generator
- Move counter, par (optimal presses), and undo

The UI surfaces the linear algebra: a terminal-style panel scrolls through the actual row reduction while the board highlights which lamps to press.

## Tech

Pure TypeScript core (`lightsout/`) with no DOM dependency so it can be unit-tested under Node. UI is React + Vite + Tailwind.

## Status

See `PLAN.md` for the full architecture and milestones. Core solver and UI scaffolding are present; remaining polish and publish steps are listed there.

## License

MIT

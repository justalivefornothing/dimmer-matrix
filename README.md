# Dimmer Matrix

Lights Out, but the interesting part is the solver.

Every board is a vector over GF(2). Every press is a column of the toggle matrix. Solving the puzzle is just solving `A x = b` with XOR as addition — and the UI shows the actual row reduction scrolling by while the board lights up the next lamp to press.

Board sizes run from 3×3 to 8×8. Plus-shaped neighbourhoods. Seeded generator that only produces solvable boards. Minimal press set via null-space enumeration. Undo, move counter, par.

Core lives in pure TypeScript under `lightsout/` (no DOM), so the algebra is unit-tested under Node. UI is React + Vite + Tailwind.

Full architecture and remaining milestones are in `PLAN.md`.

## License

MIT

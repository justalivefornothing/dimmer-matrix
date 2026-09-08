# Dimmer Matrix — plan

A lights-out puzzle with a GF(2) Gaussian-elimination solver that proves
solvability and shows the minimal press set.

## Goal

Build a small, polished Lights Out game where the interesting part is the
solver: every board state is a vector over GF(2), every press is a column of
the toggle matrix, and solving the puzzle is solving `A x = b` with XOR as
addition. The UI should make that visible — a terminal-style panel scrolls
through the actual row reduction while the board highlights which lamps to
press.

## Features (all required)

- Board sizes 3x3 through 8x8, click-to-toggle plus-shaped neighborhoods.
- Solver via Gaussian elimination over GF(2) on the n²×n² toggle matrix.
- Solvability check; unsolvable boards show the null space and an
  explanation of why no press set can work.
- Minimal-press solution by enumerating all 2^k null-space combinations
  (k = 2 for 5x5, k = 4 for 4x4).
- Step-by-step solution playback with the next lamp to press highlighted.
- Random puzzle generator that only produces solvable boards (random presses
  applied to a dark board, seeded).
- Move counter, par (optimal press count) and undo.

## Architecture

```
src/
  lightsout/
    board.ts        board as a bitmask (bigint), toggle(), neighbourhood mask
    gf2.ts          bitmask row reduction over GF(2), trace of every step
    solver.ts       buildMatrix, solve (particular + null space, minimal),
                    nullSpaceDimension, generateSolvable (seeded rng)
    *.test.ts       vitest
  ui/
    App.tsx         layout: board + control strip + reduction terminal
    Board.tsx       lamps grid with glow / ember / amber-press states
    Controls.tsx    size picker, new puzzle, solve, undo, counters
    Terminal.tsx    scrolling 0/1 rows, pivot column underlined
    useGame.ts      reducer: board history, solution, playback cursor
```

Everything in `lightsout/` is pure TypeScript with no DOM dependency so it
tests under the node environment. Boards up to 8x8 have 64 cells, so a row of
the augmented matrix fits in a `bigint` bitmask; elimination is XOR on rows.

## Milestones

1. Plan, license, scaffold (vite + react-ts + tailwind + vitest).
2. Core: board, GF(2) elimination with trace, solver with null space and
   minimal solution, seeded generator — with the spec's tests green.
3. Playable board: sizes, toggling, move counter, undo, new puzzle.
4. Solve panel: minimal press set highlighted, playback, par.
5. Reduction terminal: animated rows, pivot underline, null-space display
   for unsolvable boards.
6. Build, headless smoke, screenshot, README, publish.

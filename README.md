# Dimmer Matrix

Classic lights-out on an n×n grid with a **GF(2) Gaussian-elimination** solver.

## Features

- Click a cell to flip it and its orthogonal neighbors
- Size 2–8, random / clear / solve
- **Solve** builds the linear system and highlights a minimal press set
- Reports unsolvable boards when the system has no solution

## Run

Open `index.html` or `npx serve .`

## Files

| File | Role |
|------|------|
| `index.html` | Board shell |
| `app.js` | Game + GF(2) solver |
| `styles.css` | Neon board theme |

## License

MIT

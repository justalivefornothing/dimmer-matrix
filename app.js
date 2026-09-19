const boardEl = document.getElementById("board");
const sizeInput = document.getElementById("size");
const statusEl = document.getElementById("status");

let n = 5;
let grid = [];

function idx(r, c) {
  return r * n + c;
}

function neighbors(r, c) {
  const out = [[r, c]];
  if (r > 0) out.push([r - 1, c]);
  if (r < n - 1) out.push([r + 1, c]);
  if (c > 0) out.push([r, c - 1]);
  if (c < n - 1) out.push([r, c + 1]);
  return out;
}

function render(hints = null) {
  boardEl.style.gridTemplateColumns = `repeat(${n}, 48px)`;
  boardEl.innerHTML = "";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const btn = document.createElement("button");
      btn.className = "cell" + (grid[idx(r, c)] ? " on" : "") + (hints?.[idx(r, c)] ? " hint" : "");
      btn.addEventListener("click", () => press(r, c));
      boardEl.appendChild(btn);
    }
  }
}

function press(r, c) {
  for (const [rr, cc] of neighbors(r, c)) {
    const i = idx(rr, cc);
    grid[i] = grid[i] ? 0 : 1;
  }
  statusEl.textContent = "";
  render();
}

function randomize() {
  n = Math.max(2, Math.min(8, Number(sizeInput.value) || 5));
  sizeInput.value = n;
  grid = Array.from({ length: n * n }, () => (Math.random() < 0.45 ? 1 : 0));
  statusEl.textContent = "";
  render();
}

function clearBoard() {
  grid = Array(n * n).fill(0);
  statusEl.textContent = "";
  render();
}

/** Solve Ax = b over GF(2). Returns null if unsolvable. */
function solveGF2(A, b) {
  const m = A.length;
  const mat = A.map((row, i) => [...row, b[i]]);
  let rank = 0;
  const pivots = [];
  for (let col = 0; col < m && rank < m; col++) {
    let pivot = -1;
    for (let r = rank; r < m; r++) {
      if (mat[r][col]) {
        pivot = r;
        break;
      }
    }
    if (pivot < 0) continue;
    [mat[rank], mat[pivot]] = [mat[pivot], mat[rank]];
    for (let r = 0; r < m; r++) {
      if (r !== rank && mat[r][col]) {
        for (let k = col; k <= m; k++) mat[r][k] ^= mat[rank][k];
      }
    }
    pivots[rank] = col;
    rank++;
  }
  for (let r = rank; r < m; r++) {
    if (mat[r][m]) return null;
  }
  const x = Array(m).fill(0);
  for (let r = 0; r < rank; r++) x[pivots[r]] = mat[r][m];
  return x;
}

function solve() {
  const m = n * n;
  const A = Array.from({ length: m }, () => Array(m).fill(0));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const j = idx(r, c);
      for (const [rr, cc] of neighbors(r, c)) {
        A[idx(rr, cc)][j] = 1;
      }
    }
  }
  const b = grid.slice();
  const x = solveGF2(A, b);
  if (!x) {
    statusEl.textContent = "Unsolvable configuration";
    render();
    return;
  }
  const presses = x.reduce((s, v) => s + v, 0);
  statusEl.textContent = `Minimal presses: ${presses} (highlighted)`;
  render(x);
}

document.getElementById("random").addEventListener("click", randomize);
document.getElementById("solve").addEventListener("click", solve);
document.getElementById("clear").addEventListener("click", clearBoard);
sizeInput.addEventListener("change", randomize);
randomize();

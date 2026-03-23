import './style.css'

const canvas = document.getElementById("cubic-graph") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = 600;
canvas.height = 400;
const scale = 25; function drawAxes() {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
}

function drawGrid() {
  ctx.strokeStyle = "#c2bebf";
  ctx.lineWidth = 1;

  for (let i = 0; i <= canvas.width; i += scale) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  for (let i = 0; i <= canvas.height; i += scale) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
}

function drawCubic(a: number, b: number, c: number, d: number) {
  ctx.strokeStyle = "#66ccff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = -canvas.width / (2 * scale); x <= canvas.width / (2 * scale); x += 0.01) {
    const y = a * x ** 3 + b * x ** 2 + c * x + d;
    const px = canvas.width / 2 + x * scale;
    const py = canvas.height / 2 - y * scale;
    x === -canvas.width / (2 * scale) ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke();
}

function drawRoots(roots: number[]) {
  ctx.fillStyle = "black";
  roots.forEach(x => {
    const px = canvas.width / 2 + x * scale;
    const py = canvas.height / 2;
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateGraph(a: number, b: number, c: number, d: number, roots: number[]) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawAxes();
  drawCubic(a, b, c, d);
  drawRoots(roots);
}
const form = document.getElementById("cubic-form") as HTMLFormElement;
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const a: number = Number(formData.get("a-value"));
  const b: number = Number(formData.get("b-value"));
  const c: number = Number(formData.get("c-value"));
  const d: number = Number(formData.get("d-value"));

  if (a === 0) {
    alert("Coefficient 'a' cannot be zero.");
    return;
  }

  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (27 * a * a * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);
  const deltaSymbol = Number(((q / 2) ** 2 + (p / 3) ** 3).toFixed(10));
  document.getElementById("q-table")!.textContent = `${q}`;
  document.getElementById("p-table")!.textContent = `${p}`;
  document.getElementById("discriminant")!.textContent = `${deltaSymbol}`;

  let roots: number[] = [];
  if (deltaSymbol < 0) {
    const theta = Math.acos(Math.min(Math.max(-q / (2 * Math.sqrt((-(p / 3)) ** 3)), -1), 1)) / 3;
    const x1 = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a);
    const x2 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI / 3)) - b / (3 * a);
    const x3 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI / 3)) - b / (3 * a);
    (document.getElementById("x1") as HTMLParagraphElement).textContent = `${x1}`;
    (document.getElementById("x2") as HTMLParagraphElement).textContent = `${x2}`;
    (document.getElementById("x3") as HTMLParagraphElement).textContent = `${x3}`;
    roots = [x1, x2, x3];

  } else if (deltaSymbol > 0) {
    const x1 = Math.cbrt(-q / 2 + Math.sqrt(deltaSymbol)) + Math.cbrt(-q / 2 - Math.sqrt(deltaSymbol)) - b / (3 * a);
    (document.getElementById("x1") as HTMLParagraphElement).textContent = `${x1}`;
    (document.getElementById("x2") as HTMLParagraphElement).textContent = `${"complex"}`;
    (document.getElementById("x3") as HTMLParagraphElement).textContent = `${"complex"}`;
    roots = [x1];

  } else {
    if (q === 0 && p === 0) {
      const x1 = Math.cbrt((-q / 2) + Math.sqrt(deltaSymbol)) + Math.cbrt((-q / 2) - Math.sqrt(deltaSymbol)) - b / (3 * a);
      (document.getElementById("x1") as HTMLParagraphElement).textContent = `${x1}`;
      (document.getElementById("x2") as HTMLParagraphElement).textContent = `${x1}`;
      (document.getElementById("x3") as HTMLParagraphElement).textContent = `${x1}`;
      roots = [x1, x1, x1];

    } else {
      const x1 = Math.cbrt((-q / 2) + Math.sqrt(deltaSymbol)) + Math.cbrt((-q / 2) - Math.sqrt(deltaSymbol)) - b / (3 * a); // Cardano
      const x2 = -Math.cbrt(-q / 2) - b / (3 * a); // Single root
      (document.getElementById("x1") as HTMLParagraphElement).textContent = `${x1}`;
      (document.getElementById("x2") as HTMLParagraphElement).textContent = `${x2}`;
      (document.getElementById("x3") as HTMLParagraphElement).textContent = `${x2}`;
      roots = [x1, x2, x2];
    }
  }

  updateGraph(a, b, c, d, roots);
});

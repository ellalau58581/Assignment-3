const App export = () => {
    let root1;
    let root2;
    let root3;
  
    const [a, setA] = useState<number>(0);
    const [b, setB] = useState<number>(0);
    const [c, setC] = useState<number>(0);
    const [d, setD] = useState<number>(0);
    const [selectedGraph, setSelectedGraph] = useState<{ a: number; b: number; c: number; d: number } | null>(null);

  let roots: number[] = [];

  if (a === 0) {
    alert("Provide a non-zero value for a");
    return;
  }

  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (27 * a * a * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);
  const deltaSymbol = Number(((q / 2) ** 2 + (p / 3) ** 3).toFixed(10));
  document.getElementById("q-table")!.textContent = `${q}`;
  document.getElementById("p-table")!.textContent = `${p}`;
  document.getElementById("discriminant")!.textContent = `${deltaSymbol}`;

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


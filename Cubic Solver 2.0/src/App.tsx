import { useState } from "react";
import { CubicEquation } from "./components/CubicEquation";
import { CubicGraph } from "./components/CubicGraph";
import { CubicHistory } from "./components/CubicHistory";
import { CubicInput } from "./components/CubicInput";
import { CubicTable } from "./components/CubicTable";

const card =
  "bg-[#132237] shadow-sm p-5 h-full transition hover:shadow-lg hover:-translate-y-1";

export const App = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(0);
  const [d, setD] = useState<number>(0);

  let root1 = "";
  let root2 = "";
  let root3 = "";

  const p = a !== 0 ? (3 * a * c - b * b) / (3 * a * a) : 0;
  const q = a !== 0 ? (2 * b ** 3 - 9 * a * b * c + 27 * a ** 2 * d) / (27 * a ** 3) : 0;
  const discriminant = a !== 0 ? (q / 2) ** 2 + (p / 3) ** 3 : 0;

  if (a === 0) {
    root1 = "N/A";
    root2 = "N/A";
    root3 = "N/A";
  } else {
    const theta =
      (1 / 3) *
      Math.acos(
        Math.min(
          Math.max(-q / (2 * Math.sqrt(-((p / 3) ** 3))), -1),
          1
        )
      );

    const cardano =
      Math.cbrt(-q / 2 + Math.sqrt(discriminant)) +
      Math.cbrt(-q / 2 - Math.sqrt(discriminant)) -
      b / (3 * a);

    if (discriminant < 0) {
      const r = 2 * Math.sqrt(-p / 3);
      root1 = (r * Math.cos(theta) - b / (3 * a)).toFixed(2);
      root2 = (r * Math.cos(theta + (2 * Math.PI) / 3) - b / (3 * a)).toFixed(2);
      root3 = (r * Math.cos(theta + (4 * Math.PI) / 3) - b / (3 * a)).toFixed(2);
    } else if (discriminant > 0) {
      root1 = cardano.toFixed(2);
      root2 = "complex";
      root3 = "complex";
    } else {
      if (q === 0 && p === 0) {
        root1 = cardano.toFixed(2);
        root2 = root1;
        root3 = root1;
      } else {
        const rootTwo = (-Math.cbrt(-q / 2) - b / (3 * a)).toFixed(2);
        root1 = cardano.toFixed(2);
        root2 = rootTwo;
        root3 = rootTwo;
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#eff0f1] py-10 px-4 font-serif">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center py-8">
          <h1 className="text-5xl md:text-6xl font-bold text-[#132237] tracking-tight mb-2">
            Cubic Equation Solver
          </h1>
        </header>

        <div className={card + " py-6"}>
          <CubicEquation a={a} b={b} c={c} d={d} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <div className={card}>
            <h2 className="text-lg font-semibold mb-3 text-[#eff0f1]">Input</h2>
            <CubicInput
              a={a}
              b={b}
              c={c}
              d={d}
              setA={setA}
              setB={setB}
              setC={setC}
              setD={setD}
            />
          </div>

          <div className={card}>
            <h2 className="text-lg font-semibold mb-3 text-[#eff0f1]">Results</h2>
            <CubicTable
              p={p}
              q={q}
              discriminant={discriminant}
              root1={root1}
              root2={root2}
              root3={root3}
            />
          </div>
        </div>

        <div className={card}>
          <h2 className="text-lg font-semibold mb-3 text-[#eff0f1]">History</h2>
          <CubicHistory
            onSelect={(items: { a: number; b: number; c: number; d: number }) => {
              setA(items.a);
              setB(items.b);
              setC(items.c);
              setD(items.d);
            }}
            a={a}
            b={b}
            c={c}
            d={d}
          />
        </div>

        <div className={card + " flex flex-col"}>
          <h2 className="text-lg font-semibold mb-3 text-[#eff0f1] text-center">
            Graph
          </h2>
          <div className="flex justify-center items-center flex-grow p-4">
            <CubicGraph a={a} b={b} c={c} d={d} />
          </div>
        </div>
      </div>
    </div>
  );
};
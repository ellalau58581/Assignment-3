import { useRef, useEffect } from "react";

export const CubicGraph = ({
    a,
    b,
    c,
    d,
}: {
    a: number;
    b: number;
    c: number;
    d: number;
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Configuration
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 120;
        const step = 40;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#1f376a";
        ctx.lineWidth = 1;

        // Vertical lines moving left and right from center
        for (let i = 0; i <= centerX; i += step) {
            ctx.beginPath();
            ctx.moveTo(centerX + i, 0); ctx.lineTo(centerX + i, canvas.height);
            ctx.moveTo(centerX - i, 0); ctx.lineTo(centerX - i, canvas.height);
            ctx.stroke();
        }

        for (let i = 0; i <= centerY; i += step) {
            ctx.beginPath();
            ctx.moveTo(0, centerY + i); ctx.lineTo(canvas.width, centerY + i);
            ctx.moveTo(0, centerY - i); ctx.lineTo(canvas.width, centerY - i);
            ctx.stroke();
        }

        // 2. DRAW AXES (Light Blue)
        ctx.strokeStyle = "#00d4ff"; // Bright light blue
        ctx.lineWidth = 3;
        ctx.beginPath();
        // X-Axis
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        // Y-Axis
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.stroke();

        // 3. DRAW GRAPH
        ctx.save();
        ctx.translate(centerX, centerY);

        ctx.beginPath();
        let first = true;

        // Calculate visible range based on scale
        const range = canvas.width / (scale * 2) + 1;

        for (let x = -range; x <= range; x += 0.01) {
            const y = a * x ** 3 + b * x ** 2 + c * x + d;

            const canvasX = x * scale;
            const canvasY = -y * scale;
            if (canvasY < -centerY - 100 || canvasY > centerY + 100) {
                first = true;
                continue;
            }

            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }

        ctx.strokeStyle = "#c19d43";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.restore();
    }, [a, b, c, d]);

    return (
        <div className="flex justify-center mt-10 px-4">
            <div className="bg-transparent border border-[#1f376a] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <h2 className="text-center text-[#eff0f1] font-semibold py-4 bg-[#1f376a]/20">
                    Cubic Graph Analysis
                </h2>

                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="bg-transparent block"
                />
            </div>
        </div>
    );
};
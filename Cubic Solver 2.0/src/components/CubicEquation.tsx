type Props = {
    a: number;
    b: number;
    c: number;
    d: number;
};

export function CubicEquation({ a, b, c, d }: Props) {
    return (
        <div className="flex justify-center mt-4 px-4">
            <div className="bg-transparent border border-[#1f376a] shadow-md rounded-none px-6 py-4">
                <p className="text-center text-lg md:text-xl font-medium text-[#eff0f1] tracking-wide">
                    {a}x<span className="align-super text-sm">3</span> + {b}x
                    <span className="align-super text-sm">2</span> + {c}x + {d}
                </p>
            </div>
        </div>
    );
}
type CubicInputProps = {
    a: number;
    b: number;
    c: number;
    d: number;
    setA: (a: number) => void;
    setB: (b: number) => void;
    setC: (c: number) => void;
    setD: (d: number) => void;
};

export const CubicInput = ({
    a,
    b,
    c,
    d,
    setA,
    setB,
    setC,
    setD,
}: CubicInputProps) => {
    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-[#eff0f1] mb-4">
                Coefficients
            </h2>

            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4"
            >
                {[
                    { label: "a", value: a, setter: setA },
                    { label: "b", value: b, setter: setB },
                    { label: "c", value: c, setter: setC },
                    { label: "d", value: d, setter: setD },
                ].map(({ label, value, setter }) => (
                    <div key={label} className="flex flex-col">
                        <label className="text-sm font-medium text-[#eff0f1]/90 mb-1">
                            Coefficient {label}
                        </label>

                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setter(Number(e.target.value))}
                            className="
                bg-[#1f376a]
                border border-[#3a73b3]
                rounded-none
                text-[#eff0f1]
                p-3
                placeholder-[#9aa68c]
                focus:outline-none
                focus:ring-2
                focus:ring-[#a3b18a]
                focus:bg-white
                transition
            "
                        />
                    </div>
                ))}
            </form>
        </div>
    );
};
import { useState } from 'react';

export const CubicHistory = ({
    a,
    b,
    c,
    d,
    onSelect,
}: {
    a: number;
    b: number;
    c: number;
    d: number;
    onSelect: (item: { a: number; b: number; c: number; d: number }) => void;
}) => {
    const [history, setHistory] = useState<
        { a: number; b: number; c: number; d: number }[]
    >([]);

    return (
        <div className="p-5 bg-transparent rounded-none shadow-md border border-[#1f376a] max-w-md">

            <button
                type="submit"
                className="
          mt-2 w-full
          bg-[#c19d43]
          hover:bg-[#a8893d]
          text-[#132237]
          font-semibold
          py-2.5
          rounded-none
          shadow-sm
          transition-all
          duration-200
          active:scale-95
        "
                onClick={() => {
                    const newEntry = { a, b, c, d };
                    setHistory([...history, newEntry]);
                }}
            >
                Save
            </button>

            <ul className="mt-4 space-y-3">
                {history.map((item, index) => (
                    <li
                        key={index}
                        className="p-3 bg-transparent rounded-none border border-[#1f376a] shadow-sm flex flex-col gap-2"
                    >
                        <span className="text-sm text-[#eff0f1]">
                            a: {item.a}, b: {item.b}, c: {item.c}, d: {item.d}
                        </span>

                        <button
                            className="
                self-start
                text-sm
                bg-[#c19d43]
                hover:bg-[#a8893d]
                text-[#132237]
                px-3 py-1
                rounded-none
                transition
                active:scale-95
              "
                            onClick={() => onSelect(item)}
                        >
                            Go to Saved Values
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
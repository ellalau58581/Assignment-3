export const CubicTable = ({
    p,
    q,
    discriminant,
    root1,
    root2,
    root3,
}: {
    p: number;
    q: number;
    discriminant: number;
    root1: string;
    root2: string;
    root3: string;
}) => {
    return (
        <div className="flex justify-center mt-6 px-4">
            <div className="w-full max-w-md bg-transparent border border-[#1f376a] shadow-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-[#1f376a]">
                        {[
                            { label: "p", value: p },
                            { label: "q", value: q },
                            { label: "Discriminant", value: discriminant },
                            { label: "Root 1", value: root1 },
                            { label: "Root 2", value: root2 },
                            { label: "Root 3", value: root3 },
                        ].map((row) => (
                            <tr key={row.label} className="hover:bg-[#3a73b3]/20 transition">
                                <td className="px-4 py-3 font-medium text-[#eff0f1]">
                                    {row.label}
                                </td>
                                <td className="px-4 py-3 text-[#c19d43]">{row.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
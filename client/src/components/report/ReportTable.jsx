const ReportTable = ({
    columns = [],
    data = [],
    loading = false,
}) => {

    if (loading) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-gray-400">
                Loading Report...
            </div>
        );
    }

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-800">

                        <tr>

                            {columns.map((column) => (

                                <th
                                    key={column.key}
                                    className="text-left p-4 text-gray-300 font-medium whitespace-nowrap"
                                >
                                    {column.label}
                                </th>

                            ))}

                        </tr>

                    </thead>

                    <tbody>

                        {data.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={columns.length}
                                    className="text-center p-8 text-gray-400"
                                >
                                    No Records Found
                                </td>

                            </tr>

                        ) : (

                            data.map((row, index) => (

                                <tr
                                    key={index}
                                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                                >

                                    {columns.map((column) => (

                                        <td
                                            key={column.key}
                                            className="p-4 text-gray-300 whitespace-nowrap"
                                        >

                                            {column.render
                                                ? column.render(row)
                                                : row[column.key]}

                                        </td>

                                    ))}

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default ReportTable;
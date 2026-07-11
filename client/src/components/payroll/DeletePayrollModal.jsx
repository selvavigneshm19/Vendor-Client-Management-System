const DeletePayrollModal = ({
    open,
    onClose,
    onDelete,
    loading,
    payroll,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-slate-900 rounded-2xl p-6 w-[420px] border border-slate-700">

                <h2 className="text-xl font-bold text-white">
                    Delete Payroll
                </h2>

                <p className="text-gray-400 mt-3">
                    Are you sure you want to delete payroll for{" "}
                    <span className="font-semibold text-white">
                        {payroll?.employee?.employeeName}
                    </span>
                    ?
                </p>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg border border-slate-700 text-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        disabled={loading}
                        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default DeletePayrollModal;
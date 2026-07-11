const DeleteTaskModal = ({
    open,
    onClose,
    onDelete,
    loading,
    task,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-white mb-4">
                    Delete Task
                </h2>

                <p className="text-gray-400">
                    Are you sure you want to delete
                    <span className="font-semibold text-white">
                        {" "}
                        {task?.taskTitle}
                    </span>
                    ?
                </p>

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-5 py-2 rounded-xl border border-slate-700 text-gray-300 hover:bg-slate-800"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        disabled={loading}
                        className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default DeleteTaskModal;
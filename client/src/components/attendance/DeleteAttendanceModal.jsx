import { AlertTriangle } from "lucide-react";

const DeleteAttendanceModal = ({
    open,
    onClose,
    onDelete,
    loading,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-8">

                <div className="flex flex-col items-center text-center">

                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">

                        <AlertTriangle
                            size={34}
                            className="text-red-500"
                        />

                    </div>

                    <h2 className="text-2xl font-bold text-white">
                        Delete Attendance?
                    </h2>

                    <p className="text-gray-400 mt-3">
                        This action cannot be undone.
                    </p>

                </div>

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl border border-slate-700 text-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        disabled={loading}
                        className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete Attendance"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default DeleteAttendanceModal;
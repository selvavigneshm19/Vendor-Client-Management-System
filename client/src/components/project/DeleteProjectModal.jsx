import { AlertTriangle } from "lucide-react";

const DeleteProjectModal = ({
  open,
  onClose,
  onDelete,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md">

        <div className="flex flex-col items-center text-center">

          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-5">
            <AlertTriangle
              className="text-red-500"
              size={32}
            />
          </div>

          <h2 className="text-2xl font-bold text-white">
            Delete Project?
          </h2>

          <p className="text-gray-400 mt-3">
            This action cannot be undone.
          </p>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 border border-slate-700 rounded-xl text-white"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? "Deleting..." : "Delete Project"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteProjectModal;
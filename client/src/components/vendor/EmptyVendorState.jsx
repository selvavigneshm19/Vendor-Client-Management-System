import { Building2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyVendorState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">

      <div className="w-24 h-24 rounded-full bg-violet-600/20 flex items-center justify-center mb-6">
        <Building2
          size={50}
          className="text-violet-500"
        />
      </div>

      <h2 className="text-2xl font-bold text-white">
        No Vendors Yet
      </h2>

      <p className="text-gray-400 mt-3 max-w-md">
        You haven't added any vendors yet.
        Start by creating your first vendor.
      </p>

      <button
        onClick={() => navigate("/dashboard/vendors/add")}
        className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition"
      >
        <Plus size={20} />
        Add First Vendor
      </button>

    </div>
  );
};

export default EmptyVendorState;
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import VendorForm from "../../components/vendor/VendorForm";

const AddVendor = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>

                    <button
                        onClick={() => navigate("/dashboard/vendors")}
                        className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-4"
                    >
                        <ArrowLeft size={18} />
                        Back to Vendors
                    </button>

                    <h1 className="text-3xl font-bold text-white">
                        Add New Vendor
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Create a new vendor for your organization.
                    </p>

                </div>

            </div>

            <VendorForm />

        </div>
    );
};

export default AddVendor;
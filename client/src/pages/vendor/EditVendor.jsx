import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import VendorForm from "../../components/vendor/VendorForm";
import { getVendorById } from "../../services/vendorService";

const EditVendor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendor();
  }, []);

  const fetchVendor = async () => {
    try {
      const data = await getVendorById(id);

      setVendor(data.vendor);
    } catch (error) {
      console.error(error);

      alert("Failed to load vendor");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading Vendor...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <button
          onClick={() => navigate("/dashboard/vendors")}
          className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-5"
        >
          <ArrowLeft size={18} />
          Back to Vendors
        </button>

        <h1 className="text-4xl font-bold text-white">
          Edit Vendor
        </h1>

        <p className="text-gray-400 mt-2">
          Update vendor information.
        </p>

      </div>

      <VendorForm
        editMode={true}
        vendor={vendor}
      />

    </div>
  );
};

export default EditVendor;
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getVendors } from "../../services/vendorService";

import VendorFilters from "../../components/vendor/VendorFilters";
import VendorSearch from "../../components/vendor/VendorSearch";
import VendorStats from "../../components/vendor/VendorStats";
import VendorTable from "../../components/vendor/VendorTable";

const VendorList = () => {
    const navigate = useNavigate();

    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("All");
    const [serviceFilter, setServiceFilter] = useState("All");

    // Fetch Vendors
    const fetchVendors = async () => {
        try {
            setLoading(true);

            const data = await getVendors();

            setVendors(data.vendors || []);
            setFilteredVendors(data.vendors || []);
        } catch (error) {
            console.error("Failed to fetch vendors", error);
        } finally {
            setLoading(false);
        }
    };

    // Initial Load
    useEffect(() => {
        fetchVendors();
    }, []);

    // Live Search
    useEffect(() => {
        let filtered = [...vendors];

        // Search
        if (searchTerm.trim()) {
            const search = searchTerm.toLowerCase();

            filtered = filtered.filter((vendor) => {
                return (
                    vendor.companyName?.toLowerCase().includes(search) ||
                    vendor.vendorCode?.toLowerCase().includes(search) ||
                    vendor.contactPerson?.toLowerCase().includes(search) ||
                    vendor.email?.toLowerCase().includes(search)
                );
            });
        }

        // Status Filter
        if (statusFilter !== "All") {
            filtered = filtered.filter(
                (vendor) => vendor.status === statusFilter
            );
        }

        // Service Filter
        if (serviceFilter !== "All") {
            filtered = filtered.filter(
                (vendor) => vendor.serviceType === serviceFilter
            );
        }

        setFilteredVendors(filtered);

    }, [
        vendors,
        searchTerm,
        statusFilter,
        serviceFilter,
    ]);

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Vendor Management
                    </h1>

                    <p className="text-gray-400 mt-1">
                        Manage all your vendors in one place.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/dashboard/vendors/add")}
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl text-white font-medium transition duration-300"
                >
                    <Plus size={20} />
                    Add Vendor
                </button>

            </div>

            {/* Statistics */}
            <VendorStats vendors={filteredVendors} />

            {/* Search */}
            <VendorSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {/* Filters */}
            <VendorFilters
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                serviceFilter={serviceFilter}
                setServiceFilter={setServiceFilter}
            />

            {/* Vendor Table */}
            <VendorTable
                vendors={filteredVendors}
                loading={loading}
            />

        </div>
    );
};

export default VendorList;
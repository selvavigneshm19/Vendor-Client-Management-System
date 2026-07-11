import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminStats from "../../components/admin/AdminStats";
import AdminTable from "../../components/admin/AdminTable";

import {
    deleteAdmin,
    getAdmins,
    getAdminStats,
} from "../../services/adminService";

const AdminList = () => {

    const navigate = useNavigate();

    const [admins, setAdmins] = useState([]);

    const [stats, setStats] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchAdmins();

        fetchStats();

    }, []);

    // =====================================
    // Get Admins
    // =====================================

    const fetchAdmins = async () => {

        try {

            const response = await getAdmins();

            setAdmins(response.admins);

        } catch (error) {

            console.error(error);

        }

    };

    // =====================================
    // Get Statistics
    // =====================================

    const fetchStats = async () => {

        try {

            const response = await getAdminStats();

            setStats(response.stats);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    // =====================================
    // Delete Admin
    // =====================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this Admin?"
        );

        if (!confirmDelete) return;

        try {

            await deleteAdmin(id);

            fetchAdmins();

            fetchStats();

        } catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <h2 className="text-white text-xl">

                    Loading...

                </h2>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold text-white">

                        Admin Management

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Manage system administrators.

                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate("/dashboard/admins/add")
                    }
                    className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl text-white font-semibold"
                >

                    <Plus size={20} />

                    Add Admin

                </button>

            </div>

            {/* Stats */}

            <AdminStats stats={stats} />

            {/* Table */}

            <AdminTable
                admins={admins}
                onView={(id) =>
                    navigate(`/dashboard/admins/${id}`)
                }
                onEdit={(id) =>
                    navigate(`/dashboard/admins/edit/${id}`)
                }
                onDelete={handleDelete}
            />

        </div>

    );

};

export default AdminList;
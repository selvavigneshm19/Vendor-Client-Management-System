import {
    ArrowLeft,
    Calendar,
    CircleCheck,
    CircleX,
    Mail,
    Shield,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getAdminById,
} from "../../services/adminService";

const AdminDetails = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        fetchAdmin();
    }, []);

    // =====================================
    // Fetch Admin
    // =====================================

    const fetchAdmin = async () => {

        try {

            const response = await getAdminById(id);

            setAdmin(response.admin);

        } catch (error) {

            console.error(error);

            alert("Unable to load admin.");

        } finally {

            setLoading(false);

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

        <div className="space-y-6">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold text-white">

                        Admin Details

                    </h1>

                    <p className="text-gray-400 mt-2">

                        View administrator information.

                    </p>

                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white"
                >
                    <ArrowLeft size={18} />

                    Back

                </button>

            </div>

            {/* Card */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

                <div className="grid md:grid-cols-2 gap-8">

                    <div>

                        <label className="text-gray-400">

                            Name

                        </label>

                        <div className="flex items-center gap-3 mt-2">

                            <Shield
                                className="text-violet-500"
                            />

                            <h2 className="text-white text-xl font-semibold">

                                {admin.name}

                            </h2>

                        </div>

                    </div>

                    <div>

                        <label className="text-gray-400">

                            Email

                        </label>

                        <div className="flex items-center gap-3 mt-2">

                            <Mail
                                className="text-blue-500"
                            />

                            <span className="text-white">

                                {admin.email}

                            </span>

                        </div>

                    </div>

                    <div>

                        <label className="text-gray-400">

                            Role

                        </label>

                        <div className="mt-2">

                            <span className="px-4 py-2 rounded-full bg-violet-600 text-white">

                                {admin.role}

                            </span>

                        </div>

                    </div>

                    <div>

                        <label className="text-gray-400">

                            Status

                        </label>

                        <div className="mt-2">

                            {admin.isActive ? (

                                <span className="flex items-center gap-2 text-green-400">

                                    <CircleCheck size={18} />

                                    Active

                                </span>

                            ) : (

                                <span className="flex items-center gap-2 text-red-400">

                                    <CircleX size={18} />

                                    Inactive

                                </span>

                            )}

                        </div>

                    </div>

                    <div>

                        <label className="text-gray-400">

                            Created On

                        </label>

                        <div className="flex items-center gap-2 mt-2 text-white">

                            <Calendar size={18} />

                            {new Date(
                                admin.createdAt
                            ).toLocaleString()}

                        </div>

                    </div>

                    <div>

                        <label className="text-gray-400">

                            Last Updated

                        </label>

                        <div className="flex items-center gap-2 mt-2 text-white">

                            <Calendar size={18} />

                            {new Date(
                                admin.updatedAt
                            ).toLocaleString()}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AdminDetails;
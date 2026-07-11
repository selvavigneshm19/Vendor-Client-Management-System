import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import AdminForm from "../../components/admin/AdminForm";

import {
    getAdminById,
    updateAdmin,
} from "../../services/adminService";

const EditAdmin = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        isActive: true,
    });

    useEffect(() => {
        fetchAdmin();
    }, []);

    // =====================================
    // Fetch Admin
    // =====================================

    const fetchAdmin = async () => {

        try {

            const response = await getAdminById(id);

            setFormData({
                name: response.admin.name,
                email: response.admin.email,
                password: "",
                isActive: response.admin.isActive,
            });

        } catch (error) {

            console.error(error);

            alert("Unable to load admin.");

        } finally {

            setLoading(false);

        }

    };

    // =====================================
    // Handle Change
    // =====================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    // =====================================
    // Handle Update
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            const payload = { ...formData };

            if (!payload.password) {
                delete payload.password;
            }

            await updateAdmin(id, payload);

            alert("Admin updated successfully.");

            navigate("/dashboard/admins");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Update failed."
            );

        } finally {

            setSaving(false);

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

            <div>

                <h1 className="text-3xl font-bold text-white">
                    Edit Admin
                </h1>

                <p className="text-gray-400 mt-2">
                    Update administrator details.
                </p>

            </div>

            <AdminForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={saving}
                isEdit={true}
            />

        </div>

    );

};

export default EditAdmin;
import { Mail, Shield, User } from "lucide-react";

const AdminForm = ({
    formData,
    handleChange,
    handleSubmit,
    loading = false,
    isEdit = false,
}) => {

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6"
        >

            {/* Header */}

            <div>

                <h2 className="text-2xl font-bold text-white">

                    {isEdit
                        ? "Edit Admin"
                        : "Add New Admin"}

                </h2>

                <p className="text-gray-400 mt-2">

                    {isEdit
                        ? "Update administrator information."
                        : "Create a new administrator."}

                </p>

            </div>

            {/* Name */}

            <div>

                <label className="block text-gray-300 mb-2">

                    Full Name

                </label>

                <div className="relative">

                    <User
                        size={18}
                        className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-violet-500"
                        required
                    />

                </div>

            </div>

            {/* Email */}

            <div>

                <label className="block text-gray-300 mb-2">

                    Email Address

                </label>

                <div className="relative">

                    <Mail
                        size={18}
                        className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="admin@example.com"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-violet-500"
                        required
                    />

                </div>

            </div>

            {/* Password */}

            <div>

                <label className="block text-gray-300 mb-2">

                    Password

                </label>

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={
                        isEdit
                            ? "Leave blank to keep current password"
                            : "Enter password"
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-violet-500"
                    required={!isEdit}
                />

            </div>

            {/* Status */}

            <div>

                <label className="block text-gray-300 mb-2">

                    Status

                </label>

                <select
                    name="isActive"
                    value={formData.isActive}
                    onChange={(e) =>
                        handleChange({
                            target: {
                                name: "isActive",
                                value: e.target.value === "true",
                            },
                        })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-violet-500"
                >

                    <option value={true}>Active</option>

                    <option value={false}>Inactive</option>

                </select>

            </div>

            {/* Role */}

            <div>

                <label className="block text-gray-300 mb-2">

                    Role

                </label>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700">

                    <Shield
                        size={20}
                        className="text-violet-400"
                    />

                    <span className="text-white font-medium">

                        Administrator

                    </span>

                </div>

            </div>

            {/* Submit */}

            <div className="flex justify-end">

                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold transition"
                >

                    {loading
                        ? "Saving..."
                        : isEdit
                            ? "Update Admin"
                            : "Create Admin"}

                </button>

            </div>

        </form>

    );

};

export default AdminForm;
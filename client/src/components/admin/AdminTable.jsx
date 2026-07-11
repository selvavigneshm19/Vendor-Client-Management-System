import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

const AdminTable = ({
    admins = [],
    onView,
    onEdit,
    onDelete,
}) => {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-800">

                        <tr>

                            <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                                Name
                            </th>

                            <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                                Role
                            </th>

                            <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                                Created
                            </th>

                            <th className="px-6 py-4 text-center text-gray-300 font-semibold">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {admins.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center py-10 text-gray-400"
                                >
                                    No Admins Found
                                </td>

                            </tr>

                        ) : (

                            admins.map((admin) => (

                                <tr
                                    key={admin._id}
                                    className="border-t border-slate-800 hover:bg-slate-800/50 transition"
                                >

                                    <td className="px-6 py-4 text-white">
                                        {admin.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-300">
                                        {admin.email}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-600 text-white">
                                            {admin.role}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${admin.isActive
                                                    ? "bg-green-600 text-white"
                                                    : "bg-red-600 text-white"
                                                }`}
                                        >
                                            {admin.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-gray-400">
                                        {new Date(
                                            admin.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={() =>
                                                    onView(admin._id)
                                                }
                                                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                                            >
                                                <Eye
                                                    size={18}
                                                    className="text-white"
                                                />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    onEdit(admin._id)
                                                }
                                                className="p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition"
                                            >
                                                <Pencil
                                                    size={18}
                                                    className="text-white"
                                                />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    onDelete(admin._id)
                                                }
                                                className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                                            >
                                                <Trash2
                                                    size={18}
                                                    className="text-white"
                                                />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default AdminTable;
import { Search, X } from "lucide-react";

const EmployeeSearch = ({
    searchTerm,
    setSearchTerm,
}) => {
    return (
        <div className="relative">

            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                placeholder="Search Employees..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-12 py-3 text-white outline-none focus:border-violet-500"
            />

            {searchTerm && (
                <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                    <X size={18} />
                </button>
            )}

        </div>
    );
};

export default EmployeeSearch;
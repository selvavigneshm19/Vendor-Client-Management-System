import { Search } from "lucide-react";

const AttendanceSearch = ({
    searchTerm,
    setSearchTerm,
}) => {
    return (
        <div className="relative">

            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                placeholder="Search Employee..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
                className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white outline-none focus:border-violet-500"
            />

        </div>
    );
};

export default AttendanceSearch;
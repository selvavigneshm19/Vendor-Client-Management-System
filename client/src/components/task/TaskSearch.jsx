import { Search } from "lucide-react";

const TaskSearch = ({
    searchTerm,
    setSearchTerm,
}) => {
    return (
        <div className="relative">

            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
            />

            <input
                type="text"
                placeholder="Search task title..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-600"
            />

        </div>
    );
};

export default TaskSearch;
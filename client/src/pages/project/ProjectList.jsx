import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProjects } from "../../services/projectService";

import ProjectStats from "../../components/project/ProjectStats";
import ProjectSearch from "../../components/project/ProjectSearch";
import ProjectFilters from "../../components/project/ProjectFilters";
import ProjectTable from "../../components/project/ProjectTable";

const ProjectList = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const data = await getProjects();

      setProjects(data.projects || []);
      setFilteredProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = [...projects];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      filtered = filtered.filter((project) => {
        return (
          project.projectName?.toLowerCase().includes(search) ||
          project.projectCode?.toLowerCase().includes(search) ||
          project.client?.companyName
            ?.toLowerCase()
            .includes(search) ||
          project.vendor?.companyName
            ?.toLowerCase()
            .includes(search) ||
          project.projectManager
            ?.toLowerCase()
            .includes(search)
        );
      });
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (project) => project.status === statusFilter
      );
    }

    setFilteredProjects(filtered);
  }, [
    projects,
    searchTerm,
    statusFilter,
  ]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Project Management
          </h1>

          <p className="text-gray-400 mt-1">
            Manage all projects in one place.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/dashboard/projects/add")
          }
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl text-white font-medium transition"
        >
          <Plus size={20} />
          Add Project
        </button>

      </div>

      {/* Statistics */}
      <ProjectStats projects={filteredProjects} />

      {/* Search */}
      <ProjectSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Filters */}
      <ProjectFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Table */}
      <ProjectTable
        projects={filteredProjects}
        loading={loading}
      />

    </div>
  );
};

export default ProjectList;
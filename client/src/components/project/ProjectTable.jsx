import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { deleteProject } from "../../services/projectService";
import DeleteProjectModal from "./DeleteProjectModal";

const ProjectTable = ({
  projects,
  loading,
}) => {
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
        Loading Projects...
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">
            <tr>
              <th className="text-left p-4 text-gray-300">
                Project
              </th>

              <th className="text-left p-4 text-gray-300">
                Client
              </th>

              <th className="text-left p-4 text-gray-300">
                Vendor
              </th>

              <th className="text-left p-4 text-gray-300">
                Manager
              </th>

              <th className="text-left p-4 text-gray-300">
                Budget
              </th>

              <th className="text-left p-4 text-gray-300">
                Status
              </th>

              <th className="text-center p-4 text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {projects.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-8 text-gray-400"
                >
                  No Projects Found
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project._id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="p-4 text-white">
                    {project.projectName}
                  </td>

                  <td className="p-4 text-gray-300">
                    {project.client?.companyName}
                  </td>

                  <td className="p-4 text-gray-300">
                    {project.vendor?.companyName}
                  </td>

                  <td className="p-4 text-gray-300">
                    {project.projectManager}
                  </td>

                  <td className="p-4 text-gray-300">
                    ₹ {project.budget}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "Completed"
                          ? "bg-green-600 text-white"
                          : project.status === "In Progress"
                          ? "bg-blue-600 text-white"
                          : project.status === "Planning"
                          ? "bg-yellow-500 text-black"
                          : project.status === "On Hold"
                          ? "bg-orange-500 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      {/* View */}
                      <button
                        onClick={() =>
                          navigate(`/dashboard/projects/${project._id}`)
                        }
                        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() =>
                          navigate(`/dashboard/projects/edit/${project._id}`)
                        }
                        className="p-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setOpenDelete(true);
                        }}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {/* Delete Modal */}

      <DeleteProjectModal
        open={openDelete}
        loading={deleteLoading}
        onClose={() => {
          setOpenDelete(false);
          setSelectedProject(null);
        }}
        onDelete={async () => {
          try {
            setDeleteLoading(true);

            await deleteProject(selectedProject._id);

            alert("Project deleted successfully");

            window.location.reload();

          } catch (error) {
            alert(
              error.response?.data?.message ||
                "Failed to delete project"
            );
          } finally {
            setDeleteLoading(false);
            setOpenDelete(false);
            setSelectedProject(null);
          }
        }}
      />
    </>
  );
};

export default ProjectTable;
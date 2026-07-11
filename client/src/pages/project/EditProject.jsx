import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProjectForm from "../../components/project/ProjectForm";
import { getProjectById } from "../../services/projectService";

const EditProject = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const data = await getProjectById(id);

      setProject(data.project);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <Link
          to="/dashboard/projects"
          className="text-violet-400 hover:text-violet-300 text-sm"
        >
          ← Back to Projects
        </Link>

        <h1 className="text-3xl font-bold text-white mt-2">
          Edit Project
        </h1>

        <p className="text-gray-400">
          Update project information.
        </p>

      </div>

      <ProjectForm
        initialData={project}
        isEdit={true}
      />

    </div>
  );
};

export default EditProject;
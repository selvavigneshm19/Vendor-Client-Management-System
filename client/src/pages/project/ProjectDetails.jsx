import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProjectById } from "../../services/projectService";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const data = await getProjectById(id);

      setProject(data.project);
    } catch (error) {
      console.error(error);
    }
  };

  if (!project) {
    return (
      <div className="text-white">
        Loading...
      </div>
    );
  }

  const Item = ({ title, value }) => (
    <div className="bg-slate-800 rounded-xl p-5">
      <p className="text-sm text-gray-400">{title}</p>

      <h3 className="text-white font-semibold mt-2">
        {value || "-"}
      </h3>
    </div>
  );

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
          {project.projectName}
        </h1>

        <p className="text-gray-400">
          Project Details
        </p>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Item title="Project Name" value={project.projectName} />
          <Item title="Project Code" value={project.projectCode} />
          <Item title="Client" value={project.client?.companyName} />
          <Item title="Vendor" value={project.vendor?.companyName} />
          <Item title="Project Manager" value={project.projectManager} />
          <Item title="Budget" value={`₹ ${project.budget}`} />
          <Item title="Status" value={project.status} />
          <Item title="Start Date" value={project.startDate?.substring(0,10)} />
          <Item title="End Date" value={project.endDate?.substring(0,10)} />

        </div>

        <div className="mt-8">

          <h3 className="text-white font-semibold mb-3">
            Description
          </h3>

          <div className="bg-slate-800 rounded-xl p-5 text-gray-300">
            {project.description || "-"}
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProjectDetails;
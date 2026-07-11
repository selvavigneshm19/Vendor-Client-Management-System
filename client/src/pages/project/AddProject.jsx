import ProjectForm from "../../components/project/ProjectForm";

const AddProject = () => {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Add Project
        </h1>

        <p className="text-gray-400 mt-1">
          Create a new project.
        </p>
      </div>

      <ProjectForm />

    </div>
  );
};

export default AddProject;
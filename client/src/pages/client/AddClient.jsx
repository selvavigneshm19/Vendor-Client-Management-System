import ClientForm from "../../components/client/ClientForm";

const AddClient = () => {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Add Client
        </h1>

        <p className="text-gray-400 mt-1">
          Create a new client.
        </p>
      </div>

      <ClientForm />

    </div>
  );
};

export default AddClient;
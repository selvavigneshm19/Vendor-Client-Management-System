import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ClientForm from "../../components/client/ClientForm";
import { getClientById } from "../../services/clientService";

const EditClient = () => {
  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await getClientById(id);
        setClient(data.client);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

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
        <h1 className="text-3xl font-bold text-white">
          Edit Client
        </h1>

        <p className="text-gray-400 mt-1">
          Update client information.
        </p>
      </div>

      <ClientForm
        initialData={client}
        isEdit={true}
      />

    </div>
  );
};

export default EditClient;
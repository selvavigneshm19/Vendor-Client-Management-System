import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Briefcase,
  Hash,
} from "lucide-react";

import { getClientById } from "../../services/clientService";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  if (!client) {
    return (
      <div className="text-red-500">
        Client not found.
      </div>
    );
  }

  const Card = ({ icon, title, value }) => (
    <div className="bg-slate-800 rounded-xl p-5">
      <div className="flex items-center gap-2 text-violet-400 mb-2">
        {icon}
        <span className="text-sm">{title}</span>
      </div>

      <p className="text-white font-medium">
        {value || "-"}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">

      <button
        onClick={() => navigate("/dashboard/clients")}
        className="text-violet-400 hover:text-violet-300"
      >
        ← Back to Clients
      </button>

      <div>

        <h1 className="text-3xl font-bold text-white">
          {client.companyName}
        </h1>

        <p className="text-gray-400">
          Client Details
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <Card
          icon={<Building2 size={18} />}
          title="Company"
          value={client.companyName}
        />

        <Card
          icon={<Hash size={18} />}
          title="Client Code"
          value={client.clientCode}
        />

        <Card
          icon={<User size={18} />}
          title="Contact Person"
          value={client.contactPerson}
        />

        <Card
          icon={<Mail size={18} />}
          title="Email"
          value={client.email}
        />

        <Card
          icon={<Phone size={18} />}
          title="Phone"
          value={client.phone}
        />

        <Card
          icon={<Phone size={18} />}
          title="Alternate Phone"
          value={client.alternatePhone}
        />

        <Card
          icon={<Building2 size={18} />}
          title="Vendor"
          value={client.vendor?.companyName}
        />

        <Card
          icon={<Briefcase size={18} />}
          title="Industry"
          value={client.industry}
        />

        <Card
          icon={<Globe size={18} />}
          title="Website"
          value={client.website}
        />

        <Card
          icon={<MapPin size={18} />}
          title="City"
          value={client.city}
        />

        <Card
          icon={<MapPin size={18} />}
          title="State"
          value={client.state}
        />

        <Card
          icon={<MapPin size={18} />}
          title="Country"
          value={client.country}
        />

        <Card
          icon={<Hash size={18} />}
          title="Pincode"
          value={client.pincode}
        />

        <Card
          icon={<Hash size={18} />}
          title="GST Number"
          value={client.gstNumber}
        />

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h3 className="text-white font-semibold mb-2">
          Address
        </h3>

        <p className="text-gray-300">
          {client.address}
        </p>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h3 className="text-white font-semibold mb-2">
          Notes
        </h3>

        <p className="text-gray-300">
          {client.notes || "-"}
        </p>

      </div>

    </div>
  );
};

export default ClientDetails;
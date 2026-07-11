import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getClients } from "../../services/clientService";

import ClientStats from "../../components/client/ClientStats";
import ClientSearch from "../../components/client/ClientSearch";
import ClientFilters from "../../components/client/ClientFilters";
import ClientTable from "../../components/client/ClientTable";

const ClientList = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All");

  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      setLoading(true);

      const data = await getClients();

      setClients(data.clients || []);
      setFilteredClients(data.clients || []);
    } catch (error) {
      console.error("Failed to fetch clients", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    let filtered = [...clients];

    // Search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      filtered = filtered.filter((client) => {
        return (
          client.companyName?.toLowerCase().includes(search) ||
          client.clientCode?.toLowerCase().includes(search) ||
          client.contactPerson?.toLowerCase().includes(search) ||
          client.email?.toLowerCase().includes(search)
        );
      });
    }

    // Status Filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (client) => client.status === statusFilter
      );
    }

    // Industry Filter
    if (industryFilter !== "All") {
      filtered = filtered.filter(
        (client) => client.industry === industryFilter
      );
    }

    setFilteredClients(filtered);
  }, [
    clients,
    searchTerm,
    statusFilter,
    industryFilter,
  ]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Client Management
          </h1>

          <p className="text-gray-400 mt-1">
            Manage all your clients in one place.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/clients/add")}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl text-white font-medium transition"
        >
          <Plus size={20} />
          Add Client
        </button>

      </div>

      {/* Statistics */}
      <ClientStats clients={filteredClients} />

      {/* Search */}
      <ClientSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Filters */}
      <ClientFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        industryFilter={industryFilter}
        setIndustryFilter={setIndustryFilter}
      />

      {/* Table */}
      <ClientTable
        clients={filteredClients}
        loading={loading}
      />

    </div>
  );
};

export default ClientList;
import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| Get All Clients
|--------------------------------------------------------------------------
*/

export const getClients = async (params = {}) => {
  const response = await api.get("/clients", {
    params,
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Client By ID
|--------------------------------------------------------------------------
*/

export const getClientById = async (id) => {
  const response = await api.get(`/clients/${id}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Client
|--------------------------------------------------------------------------
*/

export const createClient = async (clientData) => {
  const response = await api.post("/clients", clientData);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Client
|--------------------------------------------------------------------------
*/

export const updateClient = async (id, clientData) => {
  const response = await api.put(
    `/clients/${id}`,
    clientData
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Client
|--------------------------------------------------------------------------
*/

export const deleteClient = async (id) => {
  const response = await api.delete(`/clients/${id}`);

  return response.data;
};
import api from "./axios";

export interface CreateAddCoustmerRequest {
  fullName: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
}

export interface UpdateCustomerRequest {
  fullName: string;
  gender: string;
  status: string;
}

export const createCustomer = (data: CreateAddCoustmerRequest) => {
  return api.post("/staff-customers/add", data);
};

export const fetchCustomerSuggestions = async (query: string) => {
  const res = await api.get("/staff-customers/suggestions", {
    params: { query },
  });
  return res.data;
};

export const allcustomer = () => {
  return api.get("/staff-customers/all");
};

export const updateCustomer = (id: number, data: UpdateCustomerRequest) => {
  return api.patch(`/staff-customers/${id}`, data);
};

export const deleteCustomer = (id: number) => {
  return api.delete(`/staff-customers/${id}`);
};

export const fetchCustomers = (
  search = "",
  status = "",
  page = 0,
  size = 5
) => {
  return api.get("/staff-customers", {
    params: { search, status, page, size },
  });
};

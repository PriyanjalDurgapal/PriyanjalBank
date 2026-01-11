import api from "../axios";

export interface CustomerLoginRequest {
  customerId: string;
  password: string;
}

export const customerLogin = (data: CustomerLoginRequest) => {
  return api.post("/customer/login", data);
};

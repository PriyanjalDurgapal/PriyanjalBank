import api from "./axios";

export interface CreateAddCoustmerRequest{
    fullName:string;
    dob:string;
    gender:string;
    mobile:string;
    email:string;
    address:string;
}
export interface UpdateCustomerRequest {
  fullName: string;
  gender: string;
  status: string;
}

export const createCustomer=(data:CreateAddCoustmerRequest)=>{

    return api.post("/customers/add",data,{
        headers: {
            "X-ROLE":localStorage.getItem("role")|| "",
        },
    });
};


//here we get all users
export const allcustomer=()=>{

    return api.get("/customers/all",{
        headers: {
            "X-ROLE":localStorage.getItem("role")|| "",
        },
    });
};

//here we update users
export const updateCustomer=(id:number,data:UpdateCustomerRequest)=>{
    return api.patch(`/customers/${id}`,data,{
        headers: {
            "X-ROLE":localStorage.getItem("role")|| "",
        },
    });
};

//delete cutomers

export const deleteCustomer=(id:number)=>{
    return api.delete(`/customers/${id}`);
};

export const fetchCustomers = (
  search = "",
  status = "",
  page = 0,
  size = 5
) => {
  return api.get("/customers", {
    params: { search, status, page, size },
    headers: {
      "X-ROLE": localStorage.getItem("role") || "",
    },
  });
};


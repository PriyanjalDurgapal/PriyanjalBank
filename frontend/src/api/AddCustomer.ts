import api from "./axios";

export interface CreateAddCoustmerRequest{
    fullName:string;
    dob:string;
    gender:string;
    mobile:string;
    email:string;
    address:string;
}

export const createCustomer=(data:CreateAddCoustmerRequest)=>{

    return api.post("/customers/add",data,{
        headers: {
            "X-ROLE":localStorage.getItem("role")|| "",
        },
    });
};


export const allcustomer=()=>{

    return api.get("/customers/all",{
        headers: {
            "X-ROLE":localStorage.getItem("role")|| "",
        },
    });
};
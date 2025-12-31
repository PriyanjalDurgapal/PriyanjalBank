import api from "./axios";

export interface AdminLoginRequest{
    email:string;
    password:string;
}

export const adminLogin=(data:AdminLoginRequest)=>{
    return api.post("/admin/login",data);
}
import api from "../axios";

/* ======================
   CREATE STAFF
====================== */
export const createStaff = (data: FormData) => {
  return api.post("/admin-staff/add", data);
};

/* ======================
   GET ALL STAFF (ACTIVE + INACTIVE)
====================== */
export const fetchStaff = () => {
  return api.get("/admin-staff/all"); // backend returns deleted=false and deleted=true staff
};

/* ======================
   UPDATE STAFF
====================== */
export const updateStaff = (id: number, data: any) => {
  return api.patch(`/admin-staff/${id}`, data);
};

/* ======================
   SOFT DELETE / DEACTIVATE STAFF
====================== */
export const softDeleteStaff = (id: number) => {
  return api.delete(`/admin-staff/soft/${id}`);
};

/* ======================
   TOGGLE ACTIVE STATUS
====================== */
export const toggleActiveStaff = (id: number) => {
  return api.patch(`/admin-staff/toggle/${id}`);
};

/* ======================
   PERMANENT DELETE STAFF
====================== */
export const permanentDeleteStaff = (id: number, reason?: string) => {
  return api.delete(`/admin-staff/permanent/${id}`, {
    params: { reason },
  });
};
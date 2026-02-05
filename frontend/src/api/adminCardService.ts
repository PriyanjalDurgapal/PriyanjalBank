import api from "./axios";

export const getPendingCardRequests = async () => {
  const res = await api.get("/admin/card/pending");
  return res.data;
};

export const approveCardRequest = async (id: number) => {
  await api.post(`/admin/card/${id}/approve`);
};

export const rejectCardRequest = async (
  id: number,
  reason: string
) => {
  await api.post(`/admin/card/${id}/reject`, null, {
    params: { reason },
  });
};

import axiosInstance from "./axiosInstance";

export const getPerfil = async (id: number) => {
    const res = await axiosInstance.get(`/perfil/${id}`);
    return res.data;
};

export const updatePerfil = async (id: number, data: any) => {
    const res = await axiosInstance.put(`/perfil/${id}`, data);
    return res.data;
};
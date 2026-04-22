import axiosInstance from "./axiosInstance";

export const getEstados = async () => {
    const res = await axiosInstance.get("/estados-pieza");
    return res.data;
};
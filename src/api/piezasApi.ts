import axiosInstance from "./axiosInstance";

export const getPiezas = async () => {
    const res = await axiosInstance.get("/piezas-dentales");
    return res.data;
};
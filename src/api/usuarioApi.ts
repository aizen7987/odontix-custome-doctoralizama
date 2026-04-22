import axiosInstance from "./axiosInstance";
import type { Usuario } from "../models/Usuario";

export const getUsuarios = async () => {
    const res = await axiosInstance.get("/usuarios");
    return res.data;
};

export const createUsuario = async (data: Partial<Usuario>) => {
    const res = await axiosInstance.post("/usuarios", data);
    return res.data;
};

export const updateUsuario = async (id: number, data: Partial<Usuario>) => {
    const res = await axiosInstance.put(`/usuarios/${id}`, data);
    return res.data;
};

export const deleteUsuario = async (id: number) => {
    const res = await axiosInstance.delete(`/usuarios/${id}`);
    return res.data;
};


export const getDoctores = async () => {
    const res = await axiosInstance.get("/doctores");
    return res.data;
};
import type { Paciente } from "../models/Pacientes";
import axiosInstance from "./axiosInstance";

// 🔹 LISTAR PACIENTES
export const getPacientes = async (): Promise<{ success: boolean, data: Paciente[] }> => {
    const res = await axiosInstance.get("/pacientes");
    return res.data;
};

// 🔹 DETALLE COMPLETO
export const getPacienteDetalle = async (id: number) => {
    const res = await axiosInstance.get(`/pacientes/${id}/detalle`);
    return res.data;
};
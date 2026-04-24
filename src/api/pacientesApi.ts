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

export const getPacientesGrid = async (params: any) => {
    const query = new URLSearchParams(params).toString();

    const res = await fetch(`/api/pacientes/grid?${query}`);
    return await res.json();
};
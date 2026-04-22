import axiosInstance from "./axiosInstance";

import type { Cita } from "../models/Cita";
import type { CrearCitaDTO } from "../models/dto/CitaDTO";
import type { CitaDoctorDTO } from "../models/dto/CitaDoctorDTO";

export const getMisCitas = async (): Promise<{ success: boolean, data: Cita[] }> => {
    const res = await axiosInstance.get("/citas/mis-citas");
    return res.data;
};

export const crearCita = async (data: CrearCitaDTO) => {
    const res = await axiosInstance.post("/citas", data);
    return res.data;
};

export const getDisponibilidad = async (doctor_id: number, fecha: string) => {
    const res = await axiosInstance.get(
        `/citas/disponibilidad?doctor_id=${doctor_id}&fecha=${fecha}`
    );
    return res.data;
};

export const tieneCitaActiva = async () => {
    const res = await axiosInstance.get("/citas/tieneActiva");
    return res.data;
};

export const atenderCita = async (id: number, data: any) => {
    const res = await axiosInstance.post(`/citas/${id}/atender`, data);
    return res.data;
};


export const getCitasDoctor = async (): Promise<{
    success: boolean;
    data: CitaDoctorDTO[];
}> => {
    const res = await axiosInstance.get("/citas/doctor");
    return res.data;
};

export const getDetalleCita = async (id: number) => {
    const res = await axiosInstance.get(`/citas/${id}/detalle`);
    return res.data;
};

export const cancelarCita = async (id: number) => {
    const res = await axiosInstance.put(`/citas/${id}/cancelar`);
    return res.data;
};

export const activarCita = async (id: number) => {
    const res = await axiosInstance.put(`/citas/${id}/activar`);
    return res.data;
};
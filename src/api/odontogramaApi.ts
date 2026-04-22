import axiosInstance from "./axiosInstance";

export const getEstadosPieza = async () => {
    const res = await axiosInstance.get("/estados-pieza");
    return res.data;
};

export const getPiezasDentales = async () => {
    const res = await axiosInstance.get("/piezas-dentales");
    return res.data;
};

export const getOdontogramaByDiagnostico = async (id: number) => {
    const res = await axiosInstance.get(`/odontograma/diagnostico/${id}`);
    return res.data;
};

export const saveOdontograma = async (data: {
    paciente_id: number;
    pieza_id: number;
    estado_id: number;
    observacion?: string;
    diagnostico_id?: number;
}) => {
    const res = await axiosInstance.post("/odontograma", data);
    return res.data;
};

export const getOdontogramaActual = async (paciente_id: number) => {
    const res = await axiosInstance.get(`/odontograma/actual/${paciente_id}`);
    return res.data;
};
export interface CitaDoctorDTO {
    id: number;
    paciente_nombre: string;
    fecha: string;
    hora: string;
    estado: "pendiente" | "atendido" | "anulado";
}
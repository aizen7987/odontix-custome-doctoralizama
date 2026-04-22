export interface Cita {
    id: number;
    paciente_id: number;
    doctor_id: number;
    fecha: string;
    hora: string;
    motivo?: string;
    estado: "pendiente" | "atendido" | "anulado";

    // opcionales (joins)
    paciente_nombre?: string;
    doctor_nombre?: string;
}
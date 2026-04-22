import type { Paciente } from "../Pacientes";

export interface PacienteDetalleDTO {
    paciente: Paciente;
    historia: {
        antecedentes_medicos: string;
        alergias: string;
        medicamentos_actuales: string;
        habitos: string;
    } | null;
    citas: {
        fecha: string;
        hora: string;
        estado: string;
    }[];
    diagnosticos: {
        descripcion: string;
        fecha: string;
    }[];
}
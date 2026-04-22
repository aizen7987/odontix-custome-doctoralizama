export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
    rol: string;
    paciente_id?: number;
    activo: number;
}
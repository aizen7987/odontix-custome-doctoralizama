export interface PiezaDental {
    id: number;
    numero: number;
    nombre: string;
}

export interface EstadoPieza {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface OdontogramaItem {
    pieza_id: number;
    estado_id: number;
    nombre?: string; // viene del join
}
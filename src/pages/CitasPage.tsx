import { useEffect, useState } from "react";
import { getMisCitas } from "../api/citasApi";
import type { Cita } from "../models/Cita";
import CitaForm from "../components/CitaForm";

export default function CitasPage() {

    const [citas, setCitas] = useState<Cita[]>([]);

    const load = async () => {
        const res = await getMisCitas();
        if (res.success) {
            setCitas(res.data);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="container-fluid">

            <h4 className="mb-3">
                <i className="bi bi-calendar-check me-2"></i>
                Mis Citas
            </h4>

            {/* FORMULARIO */}
            <CitaForm onSuccess={load} />

            {/* LISTADO */}
            {/* <div className="card mt-4 shadow-sm">
                <div className="card-body">

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Doctor</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {citas.map(c => (
                                <tr key={c.id}>
                                    <td>{c.fecha}</td>
                                    <td>{c.hora}</td>
                                    <td>{c.doctor_nombre}</td>
                                    <td>{c.estado}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            </div> */}

        </div>
    );
}
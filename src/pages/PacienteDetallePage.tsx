import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPacienteDetalle } from "../api/pacientesApi";

export default function PacienteDetallePage() {

    const { id } = useParams();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await getPacienteDetalle(Number(id));
        if (res.success) setData(res.data);
    };

    if (!data) return <p>Cargando...</p>;

    return (
        <div className="container-fluid">

            <h4>{data.paciente.nombres} {data.paciente.apellidos}</h4>

            {/* HISTORIA */}
            <div className="card mb-3">
                <div className="card-body">
                    <h6>Historia Clínica</h6>
                    <p>Alergias: {data.historia?.alergias}</p>
                    <p>Antecedentes: {data.historia?.antecedentes_medicos}</p>
                    <p>Medicamentos: {data.historia?.medicamentos_actuales}</p>
                    <p>Hábitos: {data.historia?.habitos}</p>
                </div>
            </div>

            {/* CITAS */}
            <div className="card mb-3">
                <div className="card-body">
                    <h6>Citas</h6>
                    {data.citas.map((c: any, i: number) => (
                        <div key={i}>
                            {c.fecha} - {c.hora} - {c.estado}
                        </div>
                    ))}
                </div>
            </div>

            {/* DIAGNÓSTICOS */}
            <div className="card">
                <div className="card-body">
                    <h6>Diagnósticos</h6>
                    {data.diagnosticos.map((d: any, i: number) => (
                        <div key={i}>
                            <strong>{d.fecha}</strong>
                            <p>{d.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
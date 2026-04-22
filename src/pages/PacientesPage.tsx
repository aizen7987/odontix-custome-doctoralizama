import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPacientes } from "../api/pacientesApi";

export default function PacientesPage() {

    const [pacientes, setPacientes] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await getPacientes();
        if (res.success) setPacientes(res.data);
    };

    return (
        <div className="container-fluid">
            <h4>Pacientes</h4>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {pacientes.map(p => (
                        <tr key={p.id}>
                            <td>{p.nombres} {p.apellidos}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => navigate(`/doctor/pacientes/${p.id}`)}
                                >
                                    Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
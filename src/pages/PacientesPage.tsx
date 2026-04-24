import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";
import { getPacientesGrid } from "../api/pacientesApi";
import type { PacienteDTO } from "../models/dto/PacienteDTO";

export default function PacientesPage() {

    const navigate = useNavigate();

    return (
        <div className="container-fluid">

            <h4 className="mb-3">Pacientes</h4>

            <DataTable<PacienteDTO>

                fetchData={async (params) => {
                    const json = await getPacientesGrid(params);

                    return {
                        data: json.data,
                        total: json.total
                    };
                }}

                columns={[
                    { key: "nombre_completo", label: "Paciente", sortable: true },
                    { key: "email", label: "Correo", sortable: true },
                    { key: "telefono", label: "Teléfono" }
                ]}

                actions={[
                    {
                        label: "Ver",
                        className: "btn btn-primary btn-sm",
                        onClick: (p) => navigate(`/doctor/pacientes/${p.id}`)
                    }
                ]}
            />

        </div>
    );
}
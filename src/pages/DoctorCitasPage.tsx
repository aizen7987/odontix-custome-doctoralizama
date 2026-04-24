import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable";
import type { CitaDoctorDTO } from "../models/dto/CitaDoctorDTO";
import { activarCita, cancelarCita, getCitasDoctorGrid } from "../api/citasApi";

export default function DoctorCitasPage() {

    const navigate = useNavigate();

    const puedeCancelar = (c: CitaDoctorDTO) => c.estado === "pendiente";

    const puedeReactivar = (c: CitaDoctorDTO) => {
        if (c.estado !== "anulado") return false;
        return new Date(`${c.fecha}T${c.hora}`) > new Date();
    };

    return (
        <div className="container-fluid">

            <h4 className="mb-3">Citas del Doctor</h4>

            <DataTable<CitaDoctorDTO>

                // BACKEND GRID
                fetchData={async (params) => {

                    const json = await getCitasDoctorGrid(params);

                    return {
                        data: json.data,
                        total: json.total
                    };
                }}

                // COLUMNAS GENERICAS
                columns={[
                    { key: "paciente_nombre", label: "Paciente", sortable: true },
                    { key: "fecha", label: "Fecha", type: "date", sortable: true },
                    { key: "hora", label: "Hora", sortable: true },
                    { key: "estado", label: "Estado", type: "badge", sortable: true }
                ]}

                // FILTROS GENERICOS
                filters={[
                    {
                        type: "select",
                        param: "estado",
                        options: [
                            { label: "Pendiente", value: "pendiente" },
                            { label: "Atendido", value: "atendido" },
                            { label: "Anulado", value: "anulado" }
                        ]
                    },
                    {
                        type: "dateRange",
                        fromParam: "fechaInicio",
                        toParam: "fechaFin"
                    }
                ]}

                // ACCIONES
                actions={[
                    {
                        label: (c) => c.estado === "pendiente" ? "Atender" : "Editar",
                        className: "btn btn-primary btn-sm",
                        onClick: (c) =>
                            navigate(`/doctor/citas/${c.id}/atender`)
                    },
                    {
                        label: "Cancelar",
                        className: "btn btn-danger btn-sm",
                        onClick: async (c) => {
                            await cancelarCita(c.id);
                        },
                        disabled: (c) => !puedeCancelar(c)
                    },
                    {
                        label: "Reactivar",
                        className: "btn btn-success btn-sm",
                        onClick: async (c) => {
                            await activarCita(c.id);
                        },
                        disabled: (c) => !puedeReactivar(c)
                    }
                ]}
            />

        </div>
    );
}
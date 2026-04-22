import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const { user } = useContext(AuthContext);

    return (
        <div className="container-fluid">

            {/* BIENVENIDA */}
            <div className="mb-4">
                <h3 className="fw-bold">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard
                </h3>
                <p className="text-muted">
                    Bienvenido, {user?.nombre}
                </p>
            </div>

            {/* TARJETAS */}
            <div className="row g-4">

                {/* PACIENTES */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-lg rounded-4 p-3">
                        <div className="d-flex align-items-center">
                            <div className="bg-primary text-white rounded-3 p-3 me-3">
                                <i className="bi bi-people fs-4"></i>
                            </div>

                            <div>
                                <h6 className="mb-0 text-muted">Pacientes</h6>
                                <h4 className="fw-bold">120</h4> {/* luego dinámico */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* DOCTORES */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-lg rounded-4 p-3">
                        <div className="d-flex align-items-center">
                            <div className="bg-success text-white rounded-3 p-3 me-3">
                                <i className="bi bi-person-badge fs-4"></i>
                            </div>

                            <div>
                                <h6 className="mb-0 text-muted">Doctores</h6>
                                <h4 className="fw-bold">8</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CITAS */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-lg rounded-4 p-3">
                        <div className="d-flex align-items-center">
                            <div className="bg-warning text-white rounded-3 p-3 me-3">
                                <i className="bi bi-calendar-check fs-4"></i>
                            </div>

                            <div>
                                <h6 className="mb-0 text-muted">Citas Hoy</h6>
                                <h4 className="fw-bold">25</h4>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* SECCIÓN FUTURA */}
            <div className="card border-0 shadow-lg rounded-4 mt-4">
                <div className="card-body">
                    <h5>
                        <i className="bi bi-graph-up me-2"></i>
                        Actividad reciente
                    </h5>

                    <p className="text-muted">
                        Aquí luego mostraremos estadísticas y gráficos 📊
                    </p>
                </div>
            </div>

        </div>
    );
}
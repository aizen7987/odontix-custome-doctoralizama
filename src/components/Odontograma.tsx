import { useEffect, useState } from "react";
import {
    getPiezasDentales,
    getEstadosPieza,
    getOdontogramaActual,
    saveOdontograma
} from "../api/odontogramaApi";

interface Props {
    paciente_id: number;
    diagnosticoId?: number;
}

export default function Odontograma({ paciente_id, diagnosticoId }: Props) {

    const [piezas, setPiezas] = useState<any[]>([]);
    const [estados, setEstados] = useState<any[]>([]);
    const [mapa, setMapa] = useState<any>({});

    const [piezaSeleccionada, setPiezaSeleccionada] = useState<number | null>(null);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState<number | "">("");
    const [observacion, setObservacion] = useState("");

    const getColor = (nombre?: string) => {
        switch (nombre?.toLowerCase()) {
            case "sano": return "#198754";
            case "caries": return "#dc3545";
            case "restaurado": return "#0d6efd";
            case "extraido": return "#6c757d";
            default: return "#ffffff";
        }
    };

    useEffect(() => {
        loadCatalogos();
    }, []);

    useEffect(() => {
        if (paciente_id) loadOdontograma();
    }, [paciente_id]);

    const loadCatalogos = async () => {
        const [p, e] = await Promise.all([
            getPiezasDentales(),
            getEstadosPieza()
        ]);

        if (p.success) setPiezas(p.data);
        if (e.success) setEstados(e.data);
    };

    const loadOdontograma = async () => {
        const res = await getOdontogramaActual(paciente_id);

        if (res.success) {
            const map: any = {};
            res.data.forEach((o: any) => {
                map[o.pieza_id] = o;
            });
            setMapa(map);
        }
    };

    const guardar = async () => {
        try {
            if (!diagnosticoId) {
                alert("Debe guardar diagnóstico primero");
                return;
            }

            if (!piezaSeleccionada || !estadoSeleccionado) {
                alert("Seleccione pieza y estado");
                return;
            }

            const res = await saveOdontograma({
                paciente_id,
                pieza_id: piezaSeleccionada,
                estado_id: estadoSeleccionado,
                observacion,
                diagnostico_id: diagnosticoId
            });

            if (res.success) {
                alert("Guardado");
                loadOdontograma();
                setPiezaSeleccionada(null);
            } else {
                alert(res.message || "Error del servidor");
            }

        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    return (
        <div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: "10px"
            }}>
                {piezas.map(p => {
                    const estado = mapa[p.id];

                    return (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                                setPiezaSeleccionada(p.id);

                                const data = mapa[p.id];

                                if (data) {
                                    setEstadoSeleccionado(data.estado_id);
                                    setObservacion(data.observacion || "");
                                } else {
                                    setEstadoSeleccionado("");
                                    setObservacion("");
                                }
                            }}
                            title={`Pieza ${p.numero}`}
                            style={{
                                padding: "10px",
                                borderRadius: "10px",
                                border: "1px solid #ccc",
                                background: getColor(estado?.nombre),
                                color: estado ? "#fff" : "#000"
                            }}
                        >
                            {p.numero}
                        </button>
                    );
                })}
            </div>

            {piezaSeleccionada && (
                <div className="mt-3">

                    <h6>Pieza: {piezaSeleccionada}</h6>

                    <select
                        className="form-select mb-2"
                        value={estadoSeleccionado}
                        onChange={(e) =>
                            setEstadoSeleccionado(Number(e.target.value))
                        }
                    >
                        <option value="">Seleccione estado</option>
                        {estados.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.nombre}
                            </option>
                        ))}
                    </select>

                    <textarea
                        className="form-control mb-2"
                        placeholder="Observación"
                        value={observacion}
                        onChange={(e) => setObservacion(e.target.value)}
                    />

                    <button className="btn btn-success" onClick={guardar}>
                        Guardar pieza
                    </button>
                </div>
            )}

        </div>
    );
}
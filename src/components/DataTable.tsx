import { useEffect, useState } from "react";
import type { Column, Action, Filter } from "../types/datatable";

type Props<T> = {
    columns: Column<T>[];
    fetchData: (params: any) => Promise<{ data: T[]; total: number }>;
    actions?: Action<T>[];
    filters?: Filter[];
};


export default function DataTable<T extends Record<string, any>>({
    columns,
    fetchData,
    actions,
    filters = []
}: Props<T>) {

    const [data, setData] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

    const [filterValues, setFilterValues] = useState<Record<string, any>>({});

    useEffect(() => {
        load();
    }, [page, pageSize, search, sortField, sortOrder, filterValues]);

    const load = async () => {
        const res = await fetchData({
            page,
            pageSize,
            search,
            sortField,
            sortOrder,
            ...filterValues
        });

        setData(res.data);
        setTotal(res.total);
    };

    const totalPages = Math.ceil(total / pageSize);

    const formatDate = (value: string) => {
        const [y, m, d] = value.split("-");
        return `${d}/${m}/${y}`;
    };

    const renderCell = (col: Column<T>, row: T) => {
        const value = row[col.key];

        switch (col.type) {
            case "badge":
                const map: any = {
                    pendiente: "bg-warning text-dark",
                    atendido: "bg-success",
                    anulado: "bg-danger"
                };
                return <span className={`badge ${map[value] || "bg-secondary"}`}>{value}</span>;

            case "date":
                return value ? formatDate(value) : "";

            case "number":
                return Number(value).toLocaleString();

            default:
                return String(value ?? "");
        }
    };

    const handleFilterChange = (key: string, value: any) => {
        setPage(1);
        setFilterValues(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="card p-3">

            {/* SEARCH + PAGE SIZE */}
            <div className="d-flex gap-2 mb-3">
                <input
                    className="form-control"
                    placeholder="Buscar..."
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="form-select w-auto"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    {[10, 25, 50, 100].map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* FILTERS DINAMICOS */}
            <div className="d-flex gap-2 mb-3">
                {filters.map((f, i) => {

                    if (f.type === "select") {
                        return (
                            <select
                                key={i}
                                className="form-select w-auto"
                                onChange={(e) => handleFilterChange(f.param, e.target.value)}
                            >
                                <option value="">Todos</option>
                                {f.options.map(o => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        );
                    }

                    if (f.type === "dateRange") {
                        return (
                            <>
                                <input
                                    type="date"
                                    className="form-control w-auto"
                                    onChange={(e) => handleFilterChange(f.fromParam, e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="form-control w-auto"
                                    onChange={(e) => handleFilterChange(f.toParam, e.target.value)}
                                />
                            </>
                        );
                    }

                    return null;
                })}
            </div>

            {/* TABLE */}
            <table className="table table-hover">
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th
                                key={String(col.key)}
                                onClick={() => {
                                    if (!col.sortable) return;
                                    setSortField(String(col.key));
                                    setSortOrder(prev => prev === "ASC" ? "DESC" : "ASC");
                                }}
                            >
                                {col.label}
                            </th>
                        ))}
                        {actions && <th>Acciones</th>}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, i) => (
                        <tr key={i}>
                            {columns.map(col => (
                                <td key={String(col.key)}>
                                    {renderCell(col, row)}
                                </td>
                            ))}

                            {actions && (
                                <td className="d-flex gap-1">
                                    {actions.map((a, idx) => (
                                        <button
                                            key={idx}
                                            className={a.className}
                                            disabled={a.disabled?.(row)}
                                            onClick={async () => {
                                                await a.onClick(row);
                                                load(); // SIN RELOAD
                                            }}
                                        >
                                            {typeof a.label === "function" ? a.label(row) : a.label}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* PAGINACION */}
            <div className="d-flex justify-content-between align-items-center">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                    Anterior
                </button>

                <span>
                    Página {page} de {totalPages}
                </span>

                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                    Siguiente
                </button>
            </div>

        </div>
    );
}
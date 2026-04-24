export type ColumnType = "text" | "badge" | "date" | "number";

export type Column<T> = {
    key: keyof T;
    label: string;
    type?: ColumnType;
    sortable?: boolean;
};

export type Action<T> = {
    label: string | ((row: T) => string);
    className?: string;
    onClick: (row: T) => Promise<void> | void;
    disabled?: (row: T) => boolean;
};

export type FilterOption = {
    label: string;
    value: string;
};

export type SelectFilter = {
    type: "select";
    param: string;
    options: FilterOption[];
};

export type DateRangeFilter = {
    type: "dateRange";
    fromParam: string;
    toParam: string;
};

export type Filter = SelectFilter | DateRangeFilter;

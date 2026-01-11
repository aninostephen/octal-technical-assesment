import type { RateData } from '@/interface/modules/rates/RateCell';
interface Column {
    id: string;
    label: string | React.ReactNode;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: any) => React.ReactNode;
}

interface ReusableTableProps {
    columns: Column[];
    rows: any[];
    headerSx?: object;
    isLoading?: boolean;
}

interface RowData {
    date: string;
    [key: string]: string | RateData | any;
}

export type {
    Column,
    ReusableTableProps,
    RowData
}
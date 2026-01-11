import { Dayjs } from 'dayjs';

interface ReusableDatePickerProps {
    label: string;
    value: Dayjs | null;
    onChange: (newValue: Dayjs | null) => void;
    width?: string | number;
    sx?: object;
}

export type {
    ReusableDatePickerProps
}
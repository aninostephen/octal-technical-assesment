interface SelectOption {
    label: string;
    value: string | number;
}

interface ReusableSelectProps {
    label: string;
    value: string | number | (string | number)[];
    onChange: (value: string | number | (string | number)[]) => void;
    options: SelectOption[];
    width?: string | number;
    name?: string;
    sx?: object;
    multiple?: boolean;
}

export type {
    SelectOption,
    ReusableSelectProps
}
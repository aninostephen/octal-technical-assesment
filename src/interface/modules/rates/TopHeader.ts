import { Dayjs } from 'dayjs';

interface TopHeaderProps {
    baseCurrency: string;
    handleBaseCurrencyChange: (value: string | number) => void;
    currencyOptions: { label: string; value: string | number }[]; // Assuming OptionType based on Select usage
    selectedDate: Dayjs | null;
    handleDateChange: (newValue: Dayjs | null) => void;
    targetCurrencies: string[];
    setTargetCurrencies: (value: string[]) => void;
}

export type { TopHeaderProps };

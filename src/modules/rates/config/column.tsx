import { Typography, Box } from '@mui/material';
import HeaderCell from '@/components/HeaderCell';
import type { Column } from '@/interface/components/table';
import type { RateData } from '@/interface/modules/rates/RateCell';
import RateCell from '../components/RateCell';

export const getColumns = (
    targetCurrencies: string[],
    currencyList: Record<string, string>
): Column[] => {
    const dateCol: Column = {
        id: 'date',
        label: <Box sx={{ color: 'text.primary', fontWeight: 'bold' }}>Date</Box>,
        minWidth: 120,
        align: 'left',
        format: (value: string) => <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{value}</Typography>
    };

    const valCols = targetCurrencies.map(code => ({
        id: code.toLowerCase(),
        label: <HeaderCell code={code} name={currencyList[code.toLowerCase()] || code} />,
        minWidth: 120,
        align: 'center' as const,
        format: (value: RateData) => <RateCell value={value} />
    }));

    return [dateCol, ...valCols];
};

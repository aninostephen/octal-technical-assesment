import { Typography, Box } from '@mui/material';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';
import type { RateData } from '@/interface/modules/rates/RateCell';

const RateCell = ({ value }: { value: RateData }) => {
    if (!value) return null;
    const isPositive = value.change > 0;
    const isNeutral = value.change === 0;
    const color = isNeutral ? 'text.secondary' : isPositive ? 'success.main' : 'error.main';
    const sign = isNeutral ? '' : isPositive ? '+' : ''; // Negative number already has '-'

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {value.rate.toFixed(4)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color }}>
                {isPositive ?
                    <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} /> :
                    <TrendingDownIcon sx={{ fontSize: 16, mr: 0.5 }} />}
                <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
                    {sign}{value.change.toFixed(2)}%
                </Typography>
            </Box>
        </Box>
    );
};

export default RateCell;
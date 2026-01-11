import { Typography, Box, Toolbar } from '@mui/material';
import ReusableSelect from '@/components/Select';
import ReusableDatePicker from '@/components/DatePicker';
import type { TopHeaderProps } from '@/interface/modules/rates/TopHeader';

const TopHeader = ({
    baseCurrency,
    handleBaseCurrencyChange,
    currencyOptions,
    selectedDate,
    handleDateChange,
    targetCurrencies,
    setTargetCurrencies
}: TopHeaderProps) => {
    return (
        <>
            <Toolbar sx={{ pl: 2, pr: 1, bgcolor: 'background.paper' }}>
                <Typography
                    sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Exchange Rates
                </Typography>
            </Toolbar>
            <Box sx={{ display: 'flex', gap: 4, p: 3, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ReusableSelect
                        label="Base Currency"
                        value={baseCurrency}
                        onChange={(value) => handleBaseCurrencyChange(value as string | number)}
                        options={currencyOptions}
                        width={300}
                    />
                    <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        You can select currency
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ReusableDatePicker
                        label="Select Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        width={300}
                    />
                    <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        You can select dates up to 90 days in the past
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 4, p: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <ReusableSelect
                    label="Manage Currencies"
                    multiple
                    value={targetCurrencies}
                    onChange={(newValue) => {
                        if (Array.isArray(newValue)) {
                            // Enforce Min 3 and Max 7 Rule
                            if (newValue.length < 3) {
                                // Optionally alert user or just ignore
                                return;
                            }
                            if (newValue.length > 7) {
                                return;
                            }
                            setTargetCurrencies(newValue as string[]);
                        }
                    }}
                    options={currencyOptions}
                    width="100%"
                />
            </Box>
        </>
    );
};

export default TopHeader;

import { Typography, Paper } from '@mui/material';
import React from 'react';
import RatesUseHook from './useHook';
import TopHeader from './components/TopHeader';
import ReusableTable from '@/components/Table';
import type { Column } from '@/interface/components/table';
import { getColumns } from './config/column';

const Rates = () => {
    const {
        baseCurrency,
        selectedDate,
        handleBaseCurrencyChange,
        handleDateChange,
        tableData,
        currencyOptions,
        targetCurrencies,
        setTargetCurrencies,
        currencyList,
        isLoading
    } = RatesUseHook();

    console.log(currencyList)
    const columns: Column[] = React.useMemo(() => {
        return getColumns(targetCurrencies, currencyList);
    }, [targetCurrencies, currencyList]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
            <TopHeader
                baseCurrency={baseCurrency}
                handleBaseCurrencyChange={handleBaseCurrencyChange}
                currencyOptions={currencyOptions}
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                targetCurrencies={targetCurrencies}
                setTargetCurrencies={setTargetCurrencies}
            />
            <ReusableTable
                columns={columns}
                rows={tableData}
                headerSx={{ bgcolor: 'primary.main' }}
                isLoading={isLoading}
            />
            <Typography variant="caption" sx={{ mt: 2, mb: 2, display: 'block', color: 'text.secondary', px: 3 }}>
                1 GBP = Exchange Rate in target currency
            </Typography>
        </Paper >
    );
};

export default Rates;

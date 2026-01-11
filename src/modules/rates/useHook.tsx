import { useEffect, useState, useMemo } from "react";
import dayjs, { type Dayjs } from 'dayjs';
import { ratesApi } from "@/services/apis/rates";
import type { RowData } from "@/interface/components/table";
import { calculatePercentChange } from "@/utils/calculateExchangeRate";

//Default currencies
const DEFAULT_TARGETS = ['USD', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR'];

const RatesUseHook = () => {
    const [baseCurrency, setBaseCurrency] = useState<string>('GBP');
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [targetCurrencies, setTargetCurrencies] = useState<string[]>(DEFAULT_TARGETS);

    const [currencyList, setCurrencyList] = useState<Record<string, string>>({});
    const [rawRates, setRawRates] = useState<{ date: string, data: any }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Cache to store fetched rates: key = "YYYY-MM-DD-CURRENCY"
    const rateCache = useMemo(() => new Map<string, any>(), []);

    useEffect(() => {
        setIsLoading(true);
        const fetchCurrencies = async () => {
            try {
                const response = await ratesApi.getAll('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
                if (response.data) {
                    setCurrencyList(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch currency list", error);
            }
            setIsLoading(false);
        };
        fetchCurrencies();
    }, []);

    useEffect(() => {
        const fetchRates = async () => {
            if (!selectedDate) return;

            const datesToFetch: Dayjs[] = [];
            for (let i = 0; i < 8; i++) {
                datesToFetch.push(selectedDate.subtract(i, 'day'));
            }

            // Identify which dates need fetching vs from cache
            const missingDates: string[] = [];
            const currentBatchData: { date: string, data: any }[] = [];

            datesToFetch.forEach(date => {
                const dateStr = date.format('YYYY-MM-DD');
                const cacheKey = `${dateStr}-${baseCurrency}`;
                if (rateCache.has(cacheKey)) {
                    currentBatchData.push({ date: dateStr, data: rateCache.get(cacheKey) });
                } else {
                    missingDates.push(dateStr);
                    currentBatchData.push({ date: dateStr, data: null });
                }
            });

            if (missingDates.length > 0) {
                setIsLoading(true);
                try {
                    const requests = missingDates.map(dateStr => {
                        const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${dateStr}/v1/currencies/${baseCurrency.toLowerCase()}.json`;
                        return ratesApi.getAll(url)
                            .then(res => ({ date: dateStr, data: res.data }))
                            .catch(() => ({ date: dateStr, data: null }));
                    });

                    const responses = await Promise.all(requests);

                    responses.forEach(res => {
                        const cacheKey = `${res.date}-${baseCurrency}`;
                        if (res.data) {
                            rateCache.set(cacheKey, res.data);
                        }

                        const index = currentBatchData.findIndex(item => item.date === res.date);
                        if (index !== -1) {
                            currentBatchData[index].data = res.data;
                        }
                    });

                } catch (error) {
                    console.error("Failed to fetch rates", error);
                } finally {
                    setIsLoading(false);
                }
            }
            setRawRates([...currentBatchData]);
        };

        fetchRates();
    }, [baseCurrency, selectedDate]);

    const tableData = useMemo(() => {
        const displayRates = rawRates.slice(0, 7);

        return displayRates.map((res, index) => {
            const dateStr = dayjs(res.date).format('MMM D, YYYY');
            const rates = (res.data && res.data[baseCurrency.toLowerCase()]) || {};

            // Get previous day's data for comparison from rawRates list
            const prevRes = rawRates[index + 1];
            const prevRates = (prevRes && prevRes.data && prevRes.data[baseCurrency.toLowerCase()]) || {};

            const row: RowData = { date: dateStr };

            targetCurrencies.forEach(currency => {
                const code = currency.toLowerCase();
                const rate = rates[code] || 0;
                const prevRate = prevRates[code] || 0;

                let change = 0;
                if (prevRate !== 0) {
                    change = calculatePercentChange(rate, prevRate);
                }

                row[code] = { rate: rate, change: change };
            });

            return row;
        });
    }, [rawRates, targetCurrencies, baseCurrency]);

    const currencyOptions = useMemo(() => {
        return Object.entries(currencyList).map(([code, name]) => ({
            label: `${code.toUpperCase()} - ${name}`,
            value: code.toUpperCase()
        })).sort((a, b) => a.label.localeCompare(b.label));
    }, [currencyList]);

    const handleBaseCurrencyChange = (value: string | number) => {
        setBaseCurrency(String(value));
    };

    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
    };

    const toggleCurrency = (currencyCode: string) => {
        const code = currencyCode.toUpperCase();
        setTargetCurrencies(prev => {
            if (prev.includes(code)) {
                if (prev.length <= 3) {
                    return prev;
                }
                return prev.filter(c => c !== code);
            } else {
                if (prev.length >= 7) {
                    return prev;
                }
                return [...prev, code];
            }
        });
    };

    return {
        baseCurrency,
        selectedDate,
        handleBaseCurrencyChange,
        handleDateChange,
        tableData,
        currencyOptions,
        toggleCurrency,
        targetCurrencies,
        setTargetCurrencies,
        isLoading,
        currencyList
    };
};

export default RatesUseHook;
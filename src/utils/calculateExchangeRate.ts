const calculatePercentChange = (
    current: number,
    previous: number
): number => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
};

export {
    calculatePercentChange
}
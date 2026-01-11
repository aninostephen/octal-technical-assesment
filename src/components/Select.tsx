import { Autocomplete, TextField } from '@mui/material';
import type { ReusableSelectProps, SelectOption } from '@/interface/components/select';

const ReusableSelect = ({ label, value, onChange, options, width = 120, sx, name, multiple }: ReusableSelectProps) => {
    // Find selected option(s)
    const getSelectedOption = () => {
        if (multiple) {
            if (!Array.isArray(value)) return [];
            return options.filter(option => value.includes(option.value));
        }
        return options.find(option => option.value === value) || undefined;
    };

    const selectedOption = getSelectedOption();

    return (
        <Autocomplete
            multiple={multiple}
            disableClearable={!multiple}
            options={options}
            getOptionLabel={(option) => (option as SelectOption).label}
            value={selectedOption}
            onChange={(_event, newValue: any) => {
                if (newValue) {
                    if (Array.isArray(newValue)) {
                        onChange(newValue.map((v: SelectOption) => v.value));
                    } else {
                        onChange((newValue as SelectOption).value);
                    }
                }
            }}
            sx={{ minWidth: width, ...sx }}
            size="small"
            renderInput={(params) => <TextField {...params} label={label} name={name} />}
        />
    );
};

export default ReusableSelect;
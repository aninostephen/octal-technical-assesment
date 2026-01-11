import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { ReusableDatePickerProps } from '@/interface/components/datepicker';

const ReusableDatePicker = ({ label, value, onChange, width = '100%', sx }: ReusableDatePickerProps) => {
    return (
        <DatePicker
            label={label}
            value={value}
            onChange={onChange}
            sx={{ width, ...sx }}
            slotProps={{
                textField: {
                    size: 'small',
                    fullWidth: true
                }
            }}
        />
    );
};

export default ReusableDatePicker;
import { Box, Typography } from '@mui/material';

const HeaderCell = ({ code, name }: { code: string; name: string }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {code}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {name}
        </Typography>
    </Box>
);

export default HeaderCell;

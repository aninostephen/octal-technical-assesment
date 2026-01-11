
import { Box, Container, Typography } from '@mui/material';
const Footer = () => {
    return (
        <>
            {/* Footer */}
            <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0' }}>
                <Container maxWidth="xl">
                    <Typography variant="body2" color="text.secondary" align="center">
                        © {new Date().getFullYear()} SA Exchange Rate.
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

export default Footer;
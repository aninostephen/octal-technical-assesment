import { AppBar, Toolbar, Typography } from '@mui/material';
const Header = ({ theme }: { theme: any }) => {
    return (
        <>
            {/* Header */}
            <AppBar position="fixed" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ color: theme.palette.primary.main }}>SA</span> Exchange Rates
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};

export default Header;

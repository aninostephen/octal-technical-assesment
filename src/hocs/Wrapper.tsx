import React from 'react';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import Theme from '@/hocs/ThemeSetting';
import Footer from '@/components/template/Footer';
import Header from '@/components/template/Header';
import type { WrapperProps } from '@/interface/wrapper.interface';

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'background.default'
            }}>
                <Header theme={Theme} />
                {/* Main Content */}
                <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                    {children}
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default Wrapper;

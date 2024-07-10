// pages/index.js
import { useSession } from 'next-auth/react';
import LoginPage from './login';
import InvoiceUpload from '../components/InvoiceUpload';
import { Container, Typography } from '@mui/material';

export default function HomePage() {
    const { data: session } = useSession();

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Bem-vindo
            </Typography>
            {!session ? (
                <LoginPage />
            ) : (
                <InvoiceUpload />
            )}
        </Container>
    );
}

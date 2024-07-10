// pages/login.js
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button, Container, Typography } from '@mui/material';

export default function LoginPage() {
    const { data: session } = useSession();

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Login
            </Typography>
            {!session ? (
                <Button variant="contained" color="primary" onClick={() => signIn('google')}>
                    Login with Google
                </Button>
            ) : (
                <>
                    <Typography variant="h6">Logged in as {session.user.email}</Typography>
                    <Button variant="contained" color="secondary" onClick={() => signOut()}>
                        Logout
                    </Button>
                </>
            )}
        </Container>
    );
}

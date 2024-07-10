// components/InvoiceUpload.js
import React, { useState } from 'react';
import { Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

export default function InvoiceUpload() {
    const { control, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', data.file[0]);

        try {
            const response = await axios.post('/api/upload', formData);
            setMessage('Upload successful!');
        } catch (error) {
            setMessage('Upload failed. Please try again.');
        } finally {
            setLoading(false);
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" gutterBottom>
                Upload Invoice
            </Typography>
            <Controller
                name="file"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="file"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                )}
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
            {message && <Typography variant="body1">{message}</Typography>}
        </form>
    );
}

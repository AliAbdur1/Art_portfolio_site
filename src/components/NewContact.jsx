import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';

const NewContact = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const validationSchema = yup.object({
        user_email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        user_name: yup
            .string('Enter your name')
            .min(2, 'Name should be at least 2 characters')
            .required('Name is required'),
        message: yup
            .string('Enter your message')
            .min(5, 'Message should be at least 5 characters')
            .required('Message is required'),
    });

    const formik = useFormik({
        initialValues: {
            user_email: '',
            user_name: '',
            message: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            setStatus('sending');

            emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
                .then(() => {
                    setStatus('success');
                    toast.success('Thanks for stoping by! I will get back to you soon.');
                    resetForm();
                })
                .catch(() => {
                    setStatus('error');
                    toast.error('Oh no! Something went wrong. Please try again');
                });
        },
    });

    return (
        <div>
            <h1>Contact Me</h1>
            <form ref={form} onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="user_email"
                    label="Email"
                    value={formik.values.user_email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.user_email && Boolean(formik.errors.user_email)}
                    helperText={formik.touched.user_email && formik.errors.user_email}
                    sx={{ // custom styling
                        mb: 2, // margin-bottom: 16px
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'blue' },
                            '&:hover fieldset': { borderColor: 'darkblue' },
                            '&.Mui-focused fieldset': { borderColor: 'purple' },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    id="name"
                    name="user_name"
                    label="Name"
                    value={formik.values.user_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                    helperText={formik.touched.user_name && formik.errors.user_name}
                    sx={{ // custom styling
                        mb: 2, // margin-bottom: 16px
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'blue' },
                            '&:hover fieldset': { borderColor: 'darkblue' },
                            '&.Mui-focused fieldset': { borderColor: 'purple' },
                        },
                    }}
                />
                <TextField
                    fullWidth
                    id="message"
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                    sx={{ // custom styling
                        mb: 2, // margin-bottom: 16px
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'blue' },
                            '&:hover fieldset': { borderColor: 'darkblue' },
                            '&.Mui-focused fieldset': { borderColor: 'purple' },
                        },
                    }}
                />
                <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth 
                    type="submit"
                    disabled={status === 'sending'}
                >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
                {status === 'success' && <p className="success-message">Message sent successfully!</p>}
                {status === 'error' && <p className="error-message">Failed to send message. Please try again.</p>}
            </form>
            <ToastContainer />
        </div>
    );
};

export default NewContact;

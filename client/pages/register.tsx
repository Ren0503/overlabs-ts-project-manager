import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, InputField } from 'components/shared';
import { useAuth } from 'context/AuthContext';
import { useToast } from 'context/ToastContext';
import { Form, Formik } from 'formik';
import { isEmpty, publicFetch } from 'utils';

const Register = () => {
    const toast = useToast();
    const router = useRouter();
    const { setUser } = useAuth();

    return (
        <div>
            <Head>
                <title>Labs - Register</title>
            </Head>
            <div className='w-full max-w-sm p-5 mx-auto mt-20'>
                <Link href='/'>
                    <a className='text-4xl font-bold'>
                        <span className='text-blue-700'>Over</span>labs
                    </a>
                </Link>
                <h1 className='mt-3 mb-5 text-2xl font-bold border-b'>Register</h1>

                <Formik
                    initialValues={{ username: '', email: '', password: '' }}
                    onSubmit={async (values) => {
                        try {
                            const res = await publicFetch.post('/users', values);
                            if (res.data.user) {
                                setUser(res.data.user);
                                router.push('/');
                            }
                        } catch (err) {
                            if (err.response.data) {
                                toast(err.response.data.error, 'error');
                            }
                        }
                    }}
                >
                    {({ isSubmitting, values }) => (
                        <Form>
                            <InputField label='username' name='username' />
                            <InputField label='email' name='email' />
                            <InputField type='password' label='password' name='password' />
                            <Button
                                disabled={isEmpty(values)}
                                isLoading={isSubmitting}
                                className='mt-5'
                                type='submit'
                            >
                                register
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
};

export default Register;

import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import usePost from 'hooks/usePost';
import { User } from 'interfaces';
import { useRouter } from 'next/router';
import { useAuth } from 'context/AuthContext';
import { useToast } from 'context/ToastContext';
import { Form, Formik } from 'formik';
import { isEmpty, publicFetch } from 'utils';
import { Button, InputField } from 'components/shared';

const Login = () => {
    const toast = useToast();
    const router = useRouter();
    const { setUser } = useAuth();
    const [testLogin, { loading, result }] = usePost<
        { user: User },
        { isTest: boolean }
    >('/users/login');

    useEffect(() => {
        if (result?.user) {
            setUser(result.user);
            router.push('/projects');
        }
    }, [result]);

    return (
        <div>
            <Head>
                <title>OverLabs - Login</title>
            </Head>
            <div className='w-full max-w-sm p-5 mx-auto mt-20'>
                <Link href='/'>
                    <a className='text-4xl font-bold'>
                        <span className='text-blue-700'>Over</span>labs
                    </a>
                </Link>
                <h1 className='form-title'>login</h1>

                <Formik
                    initialValues={{ usernameOrEmail: '', password: '' }}
                    onSubmit={async (values) => {
                        try {
                            const res = await publicFetch.post('users/login', values);
                            if (res.data.user) {
                                setUser(res.data.user);
                                router.push('/projects');
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
                            <InputField label='username or email' name='usernameOrEmail' />
                            <InputField type='password' label='password' name='password' />
                            <div className='flex items-center mt-5 space-x-2'>
                                <Button
                                    disabled={isEmpty(values)}
                                    isLoading={isSubmitting}
                                    type='submit'
                                >
                                    login
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
};

export default Login

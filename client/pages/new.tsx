import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, InputField, TextField } from 'components/shared';
import { useToast } from 'context/ToastContext';
import { Form, Formik } from 'formik';
import { User } from 'interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { isEmpty, publicFetch } from 'utils';
import withAuthServerSideProps from 'utils/with-auth';

const CreateProject: NextPage<{ user: User }> = () => {
    const toast = useToast();
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>create project</title>
            </Head>
            <div className='max-w-md p-5 mx-auto'>
                <h1 className='form-title'>create project</h1>
                <Formik
                    initialValues={{ name: '', description: '' }}
                    onSubmit={async (values) => {
                        try {
                            console.log(values);
                            const res = await publicFetch.post('/projects', values);
                            const project = res.data?.project;

                            if (project) {
                                toast(`new project ${project.name} created`, 'success');
                                router.push(`/projects/${project._id}`);
                            }
                        } catch (err) {
                            console.error(err);
                            if (err.response.data.error) {
                                toast(err.response.data.error, 'error');
                                return;
                            }
                            toast(err.message, 'error');
                        }
                    }}
                >
                    {({ isSubmitting, values }) => (
                        <Form>
                            <InputField label='name' name='name' />
                            <TextField label='description' name='description' />
                            <Button
                                disabled={isEmpty(values)}
                                isLoading={isSubmitting}
                                className='mt-5'
                                type='submit'
                            >
                                create project
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
};

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();

export default CreateProject;
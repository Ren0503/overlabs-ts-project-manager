import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dayjs from 'dayjs';
import { GetServerSideProps, NextPage } from 'next';
import { ProjectState } from 'context/ProjectContext';
import { Avatar } from 'components/shared';
import { FaKeyboard } from 'react-icons/fa';
import { publicFetch } from 'utils';

const ProjectsPage: NextPage<{ projects: Omit<ProjectState, 'columns'>[] }> = ({
    projects,
}) => {
    return (
        <div>
            <Head>
                <title>finlab - projects</title>
                <meta name='description' content='Collab projects' />
            </Head>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className='p-8 mb-5 bg-gray-900 border border-gray-800 rounded-md shadow-2xl'
                    >
                        <Link href={`/projects/${project._id}`}>
                            <h1 className='pb-3 mb-5 text-3xl font-bold border-b border-gray-800 cursor-pointer hover:underline w-max'>
                                {project.name}
                            </h1>
                        </Link>
                        <div className='flex items-center mb-5 space-x-2'>
                            <Avatar src={project.creator.avatar} size='sm' isRound />
                            <h3 className='font-semibold'>{project.creator.username}</h3>
                        </div>
                        <small className='text-gray-400'>
                            last updated <strong>{dayjs(project.updatedAt).toNow()}</strong>
                        </small>
                        <p className='mt-3'>{project.description}</p>
                        <div className='flex items-center mt-4 overflow-hidden border border-gray-800 rounded-md w-36'>
                            <div className='flex items-center p-2 space-x-2 bg-gray-800 shadow-inner'>
                                <FaKeyboard />
                                <p>Boards</p>
                            </div>
                            <div className='flex-1 p-2 text-right border-l border-gray-800'>
                                <p className='font-semibold'>{project.boards?.length}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const res = await publicFetch.get('/projects');
        return { props: { projects: res.data?.projects } };
    } catch (err) {
        console.error(err);
        return { redirect: { permanent: false, destination: '/' } };
    }
};

export default ProjectsPage;

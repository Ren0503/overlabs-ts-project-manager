import React from 'react';
import Head from 'next/head';
import { publicFetch } from 'utils';
import { ColumnBoard } from 'components/column';
import { ProjectInfo } from 'components/project';
import { GetServerSideProps, NextPage } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import BoardModalProvider from 'context/BoardModalContext';
import ProjectProvider, { ProjectState } from 'context/ProjectContext';

const DetailPage: NextPage<{ project: ProjectState }> = ({
    project
}) => {
    return (
        <ProjectProvider project={project}>
            <Head>
                <title>
                    finlabs - {project.creator.username}/{project.name}
                </title>
                <meta name='description' content={project.description} />
            </Head>
            <ProjectInfo />
            <BoardModalProvider>
                <ColumnBoard />
            </BoardModalProvider>
        </ProjectProvider>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    try {
        const res = await publicFetch.get(`/projects/${query.projectId}`);
        resetServerContext();
        return { props: { project: res.data.project } };
    } catch (err) {
        console.error(err);
        return { redirect: { destination: '/projects', permanent: true } };
    }
};

export default DetailPage;

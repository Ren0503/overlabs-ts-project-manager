import React from 'react';
import Head from 'next/head';
import { Showcase } from 'components/project';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Overlabs</title>
        <meta
          name='description'
          content='Find collabs, share projects, and manage task boards among peers.'
        />
      </Head>
      <Showcase />
    </div>
  );
};

export default Home;

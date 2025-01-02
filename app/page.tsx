"use client"

import { FC } from 'react';
// import { CounterContainer } from './components/CounterContainer';
import React from 'react';
import WorkspaceContainer from './components/WorkspaceContainer.tsx';

const Home: FC = () => {
    return (

        // work around how to import mathlive
        <main>
            <script defer src='https://unpkg.com/mathlive'></script>
            < WorkspaceContainer/>
        </main>
    );
};

export default Home; 

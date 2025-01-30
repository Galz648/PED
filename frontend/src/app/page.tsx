"use client"

import { FC } from 'react';
// import { CounterContainer } from './components/CounterContainer';
import React from 'react';
import WorkspaceContainer from './components/WorkspaceContainer.tsx';

const Home: FC = () => {
    return (
        <main>
            <script src={`https://unpkg.com/mathlive?module}`}></script>

            < WorkspaceContainer />
        </main>
    );
};

export default Home; 

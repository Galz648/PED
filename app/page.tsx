"use client"

import { FC } from 'react';
// import { CounterContainer } from './components/CounterContainer';
import EditorContainer from './components/WorkspaceContainer.tsx';
import React from 'react';

const Home: FC = () => {
    return (

        // work around how to import mathlive
        <main>
            <script defer src='https://unpkg.com/mathlive'></script>
            <EditorContainer />
        </main>
    );
};

export default Home; 

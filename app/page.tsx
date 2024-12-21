"use client"

import { FC } from 'react';
// import { CounterContainer } from './components/CounterContainer';
import EditorContainer from './components/WorkspaceContainer.tsx';
import React from 'react';

const Home: FC = () => {
    return (

        <main>
            <script defer src='//unpkg.com/mathlive'></script>
            <EditorContainer />
        </main>
    );
};

export default Home; 

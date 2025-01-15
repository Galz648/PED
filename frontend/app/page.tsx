import React from 'react';
import { UserProvider } from '../context/UserContext.tsx';
import DocumentsPage from './documents/page.tsx';

const App = () => {
    return (
        <UserProvider>
            <DocumentsPage />
        </UserProvider>
    );
};

export default App;

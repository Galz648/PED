"use client"
import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext.tsx';

const DocumentsPage = () => {
    const [documents, setDocuments] = useState([
        {
            id: '3',
            title: 'Document 1',
        },
        {
            id: '4',
            title: 'Document 2',
        }
    ]);
    const userId = useUser();

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents?userId=${userId}`);
            const data = await response.json();
            setDocuments(data);
        };
        fetchDocuments();
    }, [userId]);

    return (
        <div>
            <h1>Your Documents</h1>
            <ul>
                {documents.map((doc: { id: string; title: string }) => (
                    <li key={doc.id}>
                        <p>{doc.id}</p>
                        <p>{doc.title}</p>
                        <a href={`/document/${doc.id}`}>{doc.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentsPage;

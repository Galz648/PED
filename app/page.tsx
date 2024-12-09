'use client';

import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { EditorBridge } from './state_bridge.js';
import { PreviewPane } from './components/editor.tsx';

const EditorPage: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const bridgeRef = useRef<EditorBridge | null>(null);

    useEffect(() => {
        if (editorRef.current && previewRef.current) {
            const editor = monaco.editor.create(editorRef.current, {
                value: 'Start typing here... Use $$ for LaTeX equations',
                language: 'markdown',
                theme: 'vs-dark',
                automaticLayout: true,
            });

            bridgeRef.current = new EditorBridge(editor, previewRef.current);

            return () => {
                editor.dispose();
            };
        }
    }, []);

    return (
        <div className="editor-layout">
            <div ref={editorRef} className="editor-container" />
            <div ref={previewRef} className="preview-container">
                <PreviewPane />
            </div>
        </div>
    );
};

export default EditorPage; 

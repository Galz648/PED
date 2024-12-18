"use client"

import React, { useState } from "react";
import { EditorPane } from "./EditorPane.tsx";
import { RenderPane } from "./RenderPane.tsx";

const EditorContainer = () => {
    const [editorContent, setEditorContent] = useState('');
    const [previewContent, setPreviewContent] = useState('');

    const handleContentChange = (newContent: string) => {
        // setEditorContent(newContent);
        setPreviewContent(newContent);
        console.log(newContent);
        setEditorContent(newContent);
        // setPreviewContent(renderPreview(newContent)); // Transform content for the preview.
    };

    return (
        <div className="editor-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <EditorPane content={editorContent} onChange={handleContentChange} />
            <RenderPane content={previewContent} onChange={handleContentChange} />
        </div>
    );
};

export default EditorContainer;

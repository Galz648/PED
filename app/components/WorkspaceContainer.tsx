"use client"

import React, { useState } from "react";
import { EditorView } from "./EditorView.tsx";
import { RenderView } from "./RenderView.tsx";

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
    // TODO: move this to an appropriate style file
    const paneStyle = {
        width: '50%',
        height: '100%',
        border: '1px solid black',
        padding: '10px'
    }

    return (
        <div className="editor-container"
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <EditorView content={editorContent} onChange={handleContentChange} style={paneStyle} id="editor-pane" />
            <RenderView blocks={[]} onChange={handleContentChange} style={paneStyle} id="render-pane" />
        </div>
    );
};

export default EditorContainer;

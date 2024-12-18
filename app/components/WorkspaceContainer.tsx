"use client"

import React, { useState } from "react";
import { EditorView } from "./EditorView.tsx";
import { RenderView } from "./RenderView.tsx";
import { editorState } from "../services/EditorState.ts";
import { Block } from "../types/Block.ts";

const default_text = "what about this $$ frac{A}{B} $$";
const EditorContainer = () => {
    const [editorContent, setEditorContent] = useState(default_text);
    const [previewContent, setPreviewContent] = useState<Block[]>([]);
    // TODO: add debounce
    
    const handleContentChange = (newContent: string) => {
        setEditorContent(newContent);
        console.log(newContent);
        const blocks = editorState.parseContent(newContent);
        setPreviewContent(blocks);
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
            <RenderView blocks={previewContent} onChange={handleContentChange} style={paneStyle} id="render-pane" />
        </div>
    );
};

export default EditorContainer;

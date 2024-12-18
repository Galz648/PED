"use client"

import React from "react";
interface editorProps  {
    content: string;
    onChange: (newContent: string) => void; 
    style?: React.CSSProperties;
    id?: string;
}
export const EditorView = ({ content, onChange, style, id}: editorProps) => {
    return <div style={style} id={id}>

        <textarea value={content} onChange={(e) => onChange(e.target.value)} style={{ width: '100%', height: '100%' }} />
    </div>;
};

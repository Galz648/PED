"use client"

import React from "react";
interface editorProps  {
    content: string;
    onChange: (newContent: string) => void;
}
export const EditorPane = ({ content, onChange }: editorProps) => {
    return <div>
        <textarea value={content} onChange={(e) => onChange(e.target.value)} />
    </div>;
};

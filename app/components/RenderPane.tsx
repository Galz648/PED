"use client"

import React from "react";
interface renderProps {
    content: string;
    onChange: (newContent: string) => void;
}
export const RenderPane = ({ content, onChange }: renderProps) => {
    return <div>
        <textarea value={content} onChange={(e) => onChange(e.target.value)} />
    </div>;
};

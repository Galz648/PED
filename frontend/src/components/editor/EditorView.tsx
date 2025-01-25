"use client"
import { Editor } from "@monaco-editor/react";
import React from "react";
import type { State } from "../../types/state.ts"

interface EditorViewProps {
    state: State;
    handleEditorChange: (value: string | undefined, event: unknown) => void;
    style?: React.CSSProperties;
    id?: string;
}

export const EditorView = ({ state, handleEditorChange, style }: EditorViewProps) => {
    return (
        <div style={style}>
            <Editor
                height="90vh"
                defaultLanguage="latex"
                value={state.editorContent}
                theme="vs-dark"
                onChange={handleEditorChange}
            />
        </div>
    );
};

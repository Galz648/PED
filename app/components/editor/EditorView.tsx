"use client"
import { Editor, Monaco } from "@monaco-editor/react";
import React from "react";
import type { State } from "../../types/state.ts"

interface EditorViewProps {
    content: string;
    state: State;
    handleEditorChange: (value: string | undefined, event: any) => void;
    handleEditorDidMount: (editor: any, monaco: Monaco) => void;
    style?: React.CSSProperties;
    id?: string;
}

export const EditorView = ({ content, state, handleEditorChange, handleEditorDidMount, style }: EditorViewProps) => {
    return (
        <div style={style}>
            <Editor
                height="90vh"
                defaultLanguage="latex"
                value={state.editorContent}
                theme="vs-dark"
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
            />
        </div>
    );
};

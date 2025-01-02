"use client"
import React, { Dispatch, useEffect } from "react";
import type { State } from "../../types/state.ts";
import { Action, ActionType } from "../../reducers/syncReducer.ts";
import { EditorView } from "./EditorView.tsx";
import { useMonaco } from "@monaco-editor/react";
import { Monaco } from "@monaco-editor/react";
import { registerLatexLanguage } from "../../latex/syntax_highlight.ts";
import { registerLatexSnippets } from "../../latex/snippets.ts";

interface EditorContainerProps {
    state: State;
    dispatch: Dispatch<Action>;
    style?: React.CSSProperties;
    id?: string;
}

export const EditorContainer = ({ state, dispatch, style, id }: EditorContainerProps) => {
    const monaco = useMonaco();

    useEffect(() => {
        if (monaco) {
            monaco.languages.register({ id: 'latex' });
            registerLatexLanguage(monaco);
            registerLatexSnippets(monaco);
        }
    }, [monaco]);

    const handleEditorChange = (value: string | undefined, event: any) => {
        console.log("calling reducer")
        if (value !== undefined) {
            dispatch({
                type: ActionType.UPDATE_EDITOR_CONTENT,
                payload: { newContent: value }
            });
        }
    };

    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        console.log("editor did mount")
        // You can add any editor configuration here
        editor.focus();
    };

    return (
        <EditorView
            content={state.editorContent}
            state={state}
            handleEditorChange={handleEditorChange}
            handleEditorDidMount={handleEditorDidMount}
            style={style}
            id={id}
        />
    );
}; 

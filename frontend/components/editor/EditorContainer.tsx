"use client"
import React, { Dispatch, useEffect } from "react";
import type { State } from "../../app/types/state.ts";
import { Action, ActionType } from "../../app/reducers/syncReducer.ts";
import { EditorView } from "./EditorView.tsx";
import { useMonaco } from "@monaco-editor/react";
import { registerLatexLanguage } from "../../latex/syntax_highlight.ts";
import { registerLatexSnippets } from "../../latex/snippets.ts";

interface EditorContainerProps {
    state: State;
    dispatch: Dispatch<Action>;
    style?: React.CSSProperties;
}

export const EditorContainer = ({ state, dispatch, style }: EditorContainerProps) => {
    const monaco = useMonaco();

    useEffect(() => {
        if (monaco) {
            monaco.languages.register({ id: 'latex' });
            registerLatexLanguage(monaco);
            registerLatexSnippets(monaco);
        }
    }, [monaco]);

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            dispatch({
                type: ActionType.UPDATE_EDITOR_CONTENT,
                payload: {
                    newContent: value
                }
            });
        }
    };


    return (
        <EditorView
            state={state}
            handleEditorChange={handleEditorChange}
            style={style}
        />
    );
}; 

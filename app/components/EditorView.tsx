"use client"
import { Editor, useMonaco } from "@monaco-editor/react";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import type { State } from "../types/state.ts"
import { ActionType, Action } from "../reducers/stateReducer.ts"
import { registerLatexLanguage } from "../latex/syntax_highlight.ts";
import { registerLatexSnippets } from "../latex/snippets.ts";
import { Monaco } from "@monaco-editor/react";

interface editorProps {
    content: string;
    state: State;
    dispatch: Dispatch<Action>;
    style?: React.CSSProperties;
    id?: string;
}
// TODO: consider changing to enum (ActionType)
export const EditorView = ({ content, state, dispatch, style, id }: editorProps) => {
    const monaco = useMonaco();

    // not sure if this is needed
    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    useEffect(() => {
        if (monaco) {
            console.log("monaco", monaco)
            monaco.languages.register({ id: 'latex' });
            registerLatexLanguage(monaco);
            registerLatexSnippets(monaco);
        }
    }, [monaco]);

    // TODO: type the editor argument
    function handleEditorDidMount(editor: any, monaco: Monaco) {
        console.log("editor", editor)
        console.log("monaco", monaco)
    }
    return <div style={style} id={id}>
        <Editor height="90vh" defaultLanguage={"latex"} value={state.editorContent} theme="vs-dark"
            onMount={handleEditorDidMount}
            onChange={(value, event) => {
                console.log(value)
                dispatch({ type: ActionType.UPDATE_EDITOR_CONTENT, payload: { newContent: value } })
            }}
        />
    </div>;
};

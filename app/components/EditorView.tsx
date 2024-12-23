"use client"
import { Editor } from "@monaco-editor/react";
import React, { Dispatch, useRef, useState } from "react";
import type { State } from "../types/state.ts"
import { ActionType, Action } from "../reducers/stateReducer.ts"
import { registerLatexLanguage } from "../latex/syntax_highlight.ts";
import { registerLatexSnippets } from "../latex/snippets.ts";

interface editorProps {
    content: string;
    state: State;
    dispatch: Dispatch<Action>;
    style?: React.CSSProperties;
    id?: string;
}
// TODO: consider changing to enum (ActionType)
export const EditorView = ({ content, state, dispatch, style, id }: editorProps) => {

    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    return <div style={style} id={id}>
        <Editor height="90vh" defaultLanguage={"Markdown"} defaultValue={content} theme="vs-dark"
            onMount={(editor, monaco) => {

                console.log("onMount")
                registerLatexLanguage(monaco);
                // registerLatexSnippets(monaco);
                const language = editor.getModel()?.getLanguageId();
                console.log(language)
            }}
            onChange={(value, event) => {
                console.log(value)
                dispatch({ type: ActionType.UPDATE_EDITOR_CONTENT, payload: { newContent: value } })
            }}
        />
    </div>;
};

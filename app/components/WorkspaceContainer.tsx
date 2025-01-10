"use client"
import React, { useReducer, useState, useEffect } from "react";
import { EditorContainer } from "./editor/EditorContainer.tsx";
import { RenderContainer } from "./render/RenderContainer.tsx";
import { ActionType, reducer } from "../reducers/syncReducer.ts";
import { State } from "../types/state.ts";
import { get, set } from "local-storage";
import { LocalStorageKeys } from "../types/state.ts";

const WorkspaceContainer = () => {

    const initialState: State = {
        editorContent: get<string>(LocalStorageKeys.workspace) || "",
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    // TODO: this is a hack to get the editor content to update - determine a better way to handle this
    const [editorContent] = useState(state.editorContent);

    // activate processing on initial load
    useEffect(() => {
        dispatch({ type: ActionType.UPDATE_EDITOR_CONTENT, payload: { newContent: editorContent } }) // TODO: this is a hack to get the editor content to update - determine a better way to handle this
    }, []);

    useEffect(() => {
        console.log("setting localStorage")
        set(LocalStorageKeys.workspace, state.editorContent);
        console.log(`localStorage set: ${get<string>(LocalStorageKeys.workspace)}`)
    }, [state.editorContent]);

    // TODO: move this to an appropriate style file
    const paneStyle: React.CSSProperties = {
        width: '50%',
        height: '100%',
        border: '1px solid black',
        padding: '10px',
        overflow: 'auto'
    }

    return (
        <div className="editor-container"
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <EditorContainer state={state} dispatch={dispatch} style={paneStyle} id="editor-pane" />
            <RenderContainer state={state} dispatch={dispatch} style={paneStyle} id="render-pane" />
        </div>
    );
};

export default WorkspaceContainer;

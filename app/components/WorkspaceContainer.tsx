"use client"

import React, { useReducer, useState, useEffect } from "react";
import { EditorContainer } from "./editor/EditorContainer.tsx";
import { RenderContainer } from "./render/RenderContainer.tsx";
import { ActionType, reducer } from "../reducers/syncReducer.ts";
import { Block } from "../lib/blocks/types.ts";
import { State } from "../types/state.ts";
import { useCookies } from "react-cookie";


const WorkspaceContainer = () => {
    const [cookies, setCookie] = useCookies(['workspace']);


    const initialState: State = {
        editorContent: cookies.workspace || "",
        blocks: []
    }
    // TODO: make this a reducer
    const [state, dispatch] = useReducer(reducer, initialState);

    const [editorContent, setEditorContent] = useState(initialState.editorContent);
    const [blocks, setBlocks] = useState<Block[]>(initialState.blocks);


    // activate processing on initial load
    useEffect(() => {
        dispatch({ type: ActionType.UPDATE_EDITOR_CONTENT, payload: { newContent: editorContent } })

        return () => {
            console.log("unmounting WorkspaceContainer")
        }
    }, []);

    useEffect(() => {
        console.log("setting cookie")
        setCookie('workspace', state.editorContent)
    }, [state.editorContent]);

    // when the state changes, update the editor content and the blocks
    useEffect(() => {
        console.log(state)
    }, [state]);

    // TODO: move this to an appropriate style file
    const paneStyle = {
        width: '50%',
        height: '100%',
        border: '1px solid black',
        padding: '10px'
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

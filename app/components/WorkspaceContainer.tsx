"use client"

import React, { useReducer, useState, useEffect } from "react";
import { EditorView } from "./EditorView.tsx";
import { RenderView } from "./RenderView.tsx";
import { reducer } from "../reducers/stateReducer.ts";
import { Block } from "../types/block.ts";
import { State } from "../types/state.ts";


const EditorContainer = () => {

    
    
    const initialState: State= {
        editorContent: "markdown $$ foo bar $$ some more markdown $$ foo bar $$",
        blocks: []
    }

    const [editorContent, setEditorContent] = useState(initialState.editorContent);
    const [blocks, setBlocks] = useState<Block[]>(initialState.blocks);
    
    // TODO: make this a reducer
    const [state, dispatch] = useReducer(reducer, initialState);

    // useEffect - change to editor content

    useEffect(() => {
        setEditorContent(state.editorContent);
        setBlocks(state.blocks);
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
            <EditorView content={editorContent} state={state} dispatch={dispatch} style={paneStyle} id="editor-pane" />
            <RenderView blocks={blocks} state={state} dispatch={dispatch} style={paneStyle} id="render-pane" />
        </div>
    );
};

export default EditorContainer;

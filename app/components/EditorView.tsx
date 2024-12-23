"use client"

import React, { Dispatch } from "react";
import type { State } from "../types/state.ts"
import { ActionType, Action } from "../reducers/stateReducer.ts"

interface editorProps  {
    content: string;
    state: State;
    dispatch: Dispatch<Action>;
    style?: React.CSSProperties;
    id?: string;
}
// TODO: consider changing to enum (ActionType)
export const EditorView = ({ content, state, dispatch, style, id}: editorProps) => {
    return <div style={style} id={id}>
        
            <textarea value={content} onChange={(e) => dispatch({ type: ActionType.UPDATE_EDITOR_CONTENT, payload: { newContent: e.target.value } })} style={{ width: '100%', height: '100%' }} />
    </div>;
};

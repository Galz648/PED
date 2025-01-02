"use client"
import React, { Dispatch } from "react";
import type { State } from "../../types/state.ts";
import { Action } from "../../reducers/syncReducer.ts";
import { RenderView } from "./RenderView.tsx";
import { Block } from "../../lib/blocks/types.ts";

interface RenderContainerProps {
    state: State;
    dispatch: Dispatch<Action>;
    style?: React.CSSProperties;
    id?: string;
}
export const RenderContainer = ({ state, dispatch, style, id }: RenderContainerProps) => {
    // Process blocks or any other logic here
    const blocks: Block[] = state.blocks;

    return (
        <RenderView
            blocks={blocks}
            state={state}
            dispatch={dispatch}
            style={style}
            id={id}
        />
    );
}; 

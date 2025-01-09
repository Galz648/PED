"use client"
import React, { Dispatch, useEffect } from "react";
import type { State } from "../../types/state.ts";
import { Action } from "../../reducers/syncReducer.ts";
import { RenderView } from "./RenderView.tsx";
import { Block } from "../../lib/blocks/types.ts";
import { v4 as uuidv4 } from 'uuid';
interface RenderContainerProps {
    state: State;
    dispatch: Dispatch<Action>;
    style?: React.CSSProperties;
    id?: string;
}
export const RenderContainer = ({ state, dispatch, style}: RenderContainerProps) => {
    // Process blocks or any other logic here
    const blocks: Block[] = state.blocks;
    return (
        <RenderView key={"render-view"}
            state={state}
            dispatch={dispatch}
            style={style}
        />
    );
}; 

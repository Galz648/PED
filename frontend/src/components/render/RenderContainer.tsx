"use client"
import React, { Dispatch } from "react";
import type { State } from "../../types/state.ts";
import { Action } from "../../reducers/syncReducer.ts";
import { RenderView } from "./RenderView.tsx";

interface RenderContainerProps {
    state: State;
    dispatch: Dispatch<Action>;
    style?: React.CSSProperties;
    id?: string;
}
export const RenderContainer = ({ state, dispatch, style }: RenderContainerProps) => {
    // Process blocks or any other logic here
    return (
        <RenderView key={"render-view"}
            state={state}
            dispatch={dispatch}
            style={style}
        />
    );
}; 

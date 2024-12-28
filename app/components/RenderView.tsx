"use client"
import MdView from "./mdView.tsx";
import React, { Dispatch } from "react";
import { Block } from "../types/block.ts";
import MathliveBlock from "./MathliveContainer.tsx";
import type { State } from "../types/state.ts";
import type { Action } from "../reducers/stateReducer.ts";

interface RenderViewProps {
    blocks: Block[];
    state: State;
    dispatch: Dispatch<Action>;
    style?: React.CSSProperties;
    id?: string;
}

export const RenderView = ({ blocks, state, dispatch, style, id }: RenderViewProps) => {
    const mdStyle = {
        backgroundColor: '#f0f0f0',
        padding: '10px',
        border: '1px solid black',
        borderRadius: '10px',
        margin: '10px'
    };

    const latexStyle = {
        backgroundColor: '#f0f0f0',
        padding: '10px',
        border: '1px solid black',
        borderRadius: '10px',
        margin: '10px'
    };

    return (
        <div style={style} id={id}>
            {blocks.map((block, index) => (
                <div key={index}>
                    {block.type === "markdown" ? (
                        <MdView content={block.content} style={mdStyle} />
                    ) : (
                        <MathliveBlock block={block} state={state} dispatch={dispatch} style={latexStyle} />
                    )}
                </div>
            ))}
        </div>
    );
};

"use client"

import React from "react";
import { Block } from "../types/Block";
interface renderProps {
    blocks: Block[];
    onChange: (newContent: string) => void;
    style?: React.CSSProperties;
    id?: string;
}
export const RenderView = ({ blocks, onChange, style, id}: renderProps) => {
    return <div style={style} id={id}>
        {blocks.map((block, index) => {
            return <div key={index}>{`renderer: ${block.type}`}<br />{block.content}</div>;
        })}
    </div>;
};

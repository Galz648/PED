"use client"
import MdView from "./mdView"
import React from "react";
import { Block } from "../types/Block";
interface renderProps {
    blocks: Block[];
    onChange: (newContent: string) => void;
    style?: React.CSSProperties;
    id?: string;
}
export const RenderView = ({ blocks, onChange, style, id }: renderProps) => {

    return <div style={style} id={id}>
        {blocks.map((block, index) => {
            block.type ? "markdown" : "latex "
            return (
                <div key={index}>
                    {block.type === "markdown" ? (
                        <MdView content={block.content} />
                    ) : (
                    <div>{block.content}</div>
                )}
                </div>
            );
        })}

    </div>;
};

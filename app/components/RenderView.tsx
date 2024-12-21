"use client"
import MdView from "./mdView.tsx"
import React from "react";
import { Block } from "../types/Block.ts";
import MathliveBlock from "./MathliveContainer.tsx";
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
                    // <div>latex block:   {block.content}</div>

                        <MathliveBlock />
                )}
                </div>
            );
        })}

    </div>;
};

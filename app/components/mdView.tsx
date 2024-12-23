"use client"
import React, { Dispatch } from "react";
import ReactMarkdown from "react-markdown";

const MdView = ({ content, style }: { content: string, style?: React.CSSProperties }) => {
    return <div style={style}><ReactMarkdown >{`${content}`}</ReactMarkdown></div>;
};

export default MdView;

"use client"
import React from "react";
import ReactMarkdown from "react-markdown";

const MdView = ({ content }: { content: string }) => {
    return <ReactMarkdown>{`${content}`}</ReactMarkdown>;
};

export default MdView;

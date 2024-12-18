"use client"
import React from "react";
import { marked } from 'marked';

const MdView = ({ content }: { content: string }) => {
    return <div>{marked.parse(`**${content}**`, { async: false })}</div>;
};

export default MdView;

"use client"
import React, { Dispatch, ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

import MathliveContainer from "./MathliveContainer.tsx";


const MdView = ({ content, style}: { content: string, style?: React.CSSProperties }) => {
    return (
        <div style={style}>
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            code: ({children}) => {
                const child_content = children?.toString() ?? "";
                return <MathliveContainer content={child_content} />
            }
          }}
        />
        </div>
    );
};

export default MdView;

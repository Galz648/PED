"use client"
import React, { Dispatch, ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import MathliveContainer from "./MathliveContainer.tsx";
import { Action } from "../../reducers/syncReducer.ts";


const MdView = ({ content, style, dispatch, id}: { content: string, style?: React.CSSProperties, dispatch: Dispatch<Action>, id: string }) => {
    return (
        <div style={style}>
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            code: ({children, ...props}) => {
                const child_content = children?.toString() ?? "";
                console.log("child_content", child_content)
                console.log("props", props)
                return <MathliveContainer content={child_content} dispatch={dispatch} id={id} />
            }
          }}
        />
        </div>
    );
};

export default MdView;

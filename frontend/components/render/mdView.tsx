"use client"
import React, { Dispatch, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import MathliveContainer from "./MathliveContainer.tsx";
import { Action } from "../../app/reducers/syncReducer.ts";

const MdView = ({ content, style, dispatch }: { content: string, style?: React.CSSProperties, dispatch: Dispatch<Action> }) => {

  const MathliveContainerCallback = useCallback(({ children }: { children: React.ReactNode }) => {
    console.log("content", children?.toString())
    return <MathliveContainer content={children?.toString() ?? ""} dispatch={dispatch} key={"stable-key-mathlive-container"} />
  }, [])

  return (
    <div style={style}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          code: MathliveContainerCallback
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MdView;

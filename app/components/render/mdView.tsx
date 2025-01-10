"use client"
import React, { Dispatch, ReactElement, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import MathliveContainer from "./MathliveContainer.tsx";
import { Action } from "../../reducers/syncReducer.ts";

const MdView = ({ content, style, dispatch }: { content: string, style?: React.CSSProperties, dispatch: Dispatch<Action> }) => {

  const MathliveContainerCallback = useCallback(({ children, id}: { children: React.ReactNode, id: string }) => {
    console.log("content", children?.toString())
    return <MathliveContainer content={children?.toString() ?? ""} dispatch={dispatch} id={id} key={"stable-key-mathlive-container"}/>
  }, [] )

  return (
    <div style={style}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          // code: ({ children, node, ...props }) => {
          //   return MathliveContainerCallback({ content: children?.toString() ?? "", id: uuidv4() })
          // }
          code: MathliveContainerCallback
        }}
      />
    </div>
  );
};

export default MdView;

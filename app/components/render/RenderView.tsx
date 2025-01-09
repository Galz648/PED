"use client"
import MdView from "./mdView.tsx";
import React, { Dispatch, useEffect } from "react";
import type { State } from "../../types/state.ts";
import type { Action } from "../../reducers/syncReducer.ts";
import type { Block } from "../../lib/blocks/types.ts";
import { v4 as uuidv4 } from 'uuid';

interface RenderViewProps {
  state: State;
  dispatch: Dispatch<Action>;
  style?: React.CSSProperties;
}

export const RenderView = ({ state, dispatch, style }: RenderViewProps) => {
  const mdStyle = {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    border: '1px solid black',
    borderRadius: '10px',
    margin: '10px'
  };

  const latexStyle = {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    border: '1px solid black',
    borderRadius: '10px',
    margin: '10px'
  };

  return (
    <div style={style}>
      <MdView content={state.editorContent} dispatch={dispatch} />
    </div>
  );
};

export default RenderView;

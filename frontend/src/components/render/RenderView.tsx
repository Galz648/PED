"use client"
import MdView from "./mdView.tsx";
import React, { Dispatch } from "react";
import type { State } from "../../types/state.ts";
import type { Action } from "../../reducers/syncReducer.ts";

interface RenderViewProps {
  state: State;
  dispatch: Dispatch<Action>;
  style?: React.CSSProperties;
}

export const RenderView = ({ state, dispatch, style }: RenderViewProps) => {
  return (
    <div style={style}>
      <MdView content={state.editorContent} dispatch={dispatch} />
    </div>
  );
};

export default RenderView;

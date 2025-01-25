"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Action, ActionType } from '../../reducers/syncReducer.ts';

import '../App.css'


// import { MathfieldComponent } from "react-mathlive";
import { useRef, Dispatch } from 'react'
import React from 'react'
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'math-field': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
//     }
//   }
// }`



function MathliveBlock({ content, dispatch }: { content: string, dispatch: Dispatch<Action> }) {
  // Customize the mathfield when it is mounted
  const mf = useRef<any>(null)


  return ( // @ts-expect-error can't type this
    <math-field ref={mf} onInput={(evt: any) => {
      console.log(`onInput`)
      dispatch({ type: ActionType.UPDATE_BLOCK_CONTENT, payload: { newContent: evt.target.value, oldContent: content } })
    }}>
      {content}
      {/* @ts-expect-error  can't type this */}
    </math-field>
  )
}

export default MathliveBlock

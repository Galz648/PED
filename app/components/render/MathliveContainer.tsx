import { State } from '../../types/state.ts';
import { Action, ActionType } from '../../reducers/syncReducer.ts';
import { Block } from '../../lib/blocks/types.ts';
import '../App.css'


// import { MathfieldComponent } from "react-mathlive";
import { useState, useRef, useEffect, Dispatch } from 'react'
import React from 'react'
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'math-field': React.DetailedHTMLProps<React.HTMLAttributes<any>, any>;
//     }
//   }
// }



function MathliveBlock({ content, dispatch, id }: { content: string, dispatch: Dispatch<Action>, id: string }) {
  // Customize the mathfield when it is mounted
  const mf = useRef<any>(null)

  // log unmounting
  useEffect(() => {
    console.log(`mounting: ${id}`)
    console.log(mf.current)
    return () => {
      console.log(`unmounting: ${id}`)
    }
  }, [])

  return (
    // @ts-ignore
    <math-field ref={mf} onInput={(evt) => {
      console.log(`onInput`)
      dispatch({ type: ActionType.UPDATE_BLOCK, payload: { newContent: evt.target.value, oldContent: content } })
    }}>
      {content}
      {/* @ts-ignore */}
    </math-field>
  )
}

export default MathliveBlock

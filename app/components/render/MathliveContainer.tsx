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



function MathliveBlock({ content, dispatch, id}: { content: string, dispatch: Dispatch<Action>, id: string}) {
  // Customize the mathfield when it is mounted
  const mf = useRef<any>(null)
  // useEffect(() => {
  //   // Read more about customizing the mathfield: https://cortexjs.io/mathlive/guides/customizing/
  //   // TODO: make sure mf and current are not null
  //   // mf!.current!.smartFence = true

  //   // This could be an `onInput` handler, but this is an alternative
  //   // TODO: make sure mf and current are not null
  //   // mf!.current!.addEventListener('input', (evt: Event) => {
  //   //   // When the return key is pressed, play a sound
  //   //   if (evt.type === 'insertLineBreak') {
  //   //     // The mathfield is available as `evt.target`
  //   //     // The mathfield can be controlled with `executeCommand`
  //   //     // Read more: https://cortexjs.io/mathlive/guides/commands/
  //   //     // evt.target.executeCommand('plonk')
  //   //   }
  //   // })
  // }, [])

  // TODO: consider adding a debounce for performance
  return (
    // @ts-ignore
    <math-field ref={mf} onInput={(evt) => {
      // TODO: lift this up to the WorkspaceContainer
      dispatch({ type: ActionType.UPDATE_BLOCK, payload: { id: id, newContent: evt.target.value, oldContent: content } })
    }}>
      {content}
      {/* @ts-ignore */}
    </math-field>
  )
}

export default MathliveBlock

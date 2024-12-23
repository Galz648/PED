import { State } from '../types/state.ts';
import { Action } from '../reducers/stateReducer.ts';
import { Block } from '../types/block.ts';
import './App.css'


// import { MathfieldComponent } from "react-mathlive";
import { useState, useRef, useEffect, Dispatch } from 'react'
import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<React.HTMLAttributes<MathfieldElement>, MathfieldElement>;
    }
  }
}



function MathliveBlock({ block, state, dispatch }: { block: Block, state: State, dispatch: Dispatch<Action> }) {
  // const [value, setValue] = useState('\\sqrt{x}')
  // const [value, _] = useState(initialValue)

  // Customize the mathfield when it is mounted
  const mf = useRef<MathfieldElement>(null)
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

  // Update the mathfield when the value changes
  useEffect(() => {
    // TODO: make sure mf and current are not null
    mf!.current!.value = block.content
    // given the appropriate block information
    console.log(block)
    // update the editor content
  }, [block])


  return (
    <math-field ref={mf} onInput={(evt) => {
      console.log(evt.target.value)
    }}>
      {mf.current?.value}
    </math-field>
  )
}

export default MathliveBlock

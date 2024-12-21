import './App.css'



import { useState, useRef, useEffect } from 'react'
import { MathfieldElement } from 'mathlive'
import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<React.HTMLAttributes<MathfieldElement>, MathfieldElement>;
    }
  }
}



function MathliveBlock() {
  const [value, setValue] = useState('\\sqrt{x}')

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
    mf!.current!.value = value
  }, [value])

 return (
    <div className='App'>
      <h1>MathLive with React: PED</h1>
      <math-field ref={mf} onInput={(evt) => console.log(evt.target)}>
        {value}
      </math-field>
      <code>Value: {value}</code>
    </div>
  )
}

export default MathliveBlock

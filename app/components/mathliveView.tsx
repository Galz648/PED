// "use client"
// // Controlled Component Example
// import { MathfieldComponent } from "react-mathlive";
// import React, { useState } from "react";

// export function MathEditor() {
//   const [latex, setLatex] = useState("f(x)=\\log _10 x");

//   return (
//     <MathfieldComponent
//       latex={latex}
//       onChange={(newLatex) => setLatex(newLatex)}
//       mathfieldConfig={{
//         defaultMode: "text",
//         virtualKeyboardMode: "manual",
//       }}
//     />
//   );
// }

import { useState } from "react";

function MathEditor() {
  const [value, setValue] = useState("/sqrt(2)");

  return (
    <div className="App">
      <math-field 
        onInput={evt => setValue(evt.target.value)}
      >
        {value}
      </math-field>
      <p>Value: {value}</p>
    </div>
  );
}

export default MathEditor;

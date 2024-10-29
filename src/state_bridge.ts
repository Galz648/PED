import * as monaco from 'monaco-editor';

// TODO: add error handling to missing elements
const mf = document.getElementById("formula")!
const editor = monaco.editor.getEditors()[0]
// editor.onDidChangeCursorPosition((e) => {
//     console.log(JSON.stringify(e));
// })


editor.onDidChangeModelContent((event) => {
    console.log("Content changed:", editor.getValue());
    // monaco updates -> update mathlive state

    //TODO: fix "setValue does not exist on HTMLElement type error" (add appropriate type of exists)
    mf.setValue(
        editor.getValue(),
        { silenceNotifications: false } // not sure what this is for
    )
});



// TODO: fix type errors
mf.addEventListener("input", (ev) => {
    // mathlive updates -> update monaco state
    console.log(ev.target?.value);
    editor.setValue(ev.target?.value);
})

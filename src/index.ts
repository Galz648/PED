document.addEventListener("DOMContentLoaded", () => {
    let textarea = document.getElementById("Editor")! as HTMLTextAreaElement;
    const displayDiv = document.getElementById('displayDiv')! as HTMLDivElement

    if ((!textarea || !displayDiv)) {
        throw Error("something is inont defined")
    }
    textarea.addEventListener('input', () => {
        displayDiv.innerText = textarea.value;
    });
    console.log("this should recompile!!")
});


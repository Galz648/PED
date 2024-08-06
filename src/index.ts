import { my_includes } from "./utils.js";
import { simple_parser } from "./parsers.js";
import { parse } from "./parser.js";

const editorID = "editor";
const compiledExpressionID = "compiled_expression";
const tokenDisplayID = "token_display";
const USER_INPUT_STATE_KEY = 'input_text';

// loads dom elements - better names -> load_dom_elements
const textarea = document.getElementById(editorID)! as HTMLTextAreaElement;
const ce_div = document.getElementById(compiledExpressionID)! as HTMLDivElement;
const token_display_div = document.getElementById(tokenDisplayID)! as HTMLDivElement;

let valid = null;

if (!textarea || !ce_div || !token_display_div) {
    throw Error("something went wrong, html elements are missing.")
}
const textarea_oninput = () => {
    // Save the state of the text area to session storage
    sessionStorage.setItem(USER_INPUT_STATE_KEY, textarea.value);

    const expr = textarea.value;
    ce_div.innerText = expr;

    try {
        const result = parse(simple_parser, expr);
        token_display_div.innerText = JSON.stringify(result);
    } catch (e) {
        console.error(e)
        textarea.style.backgroundColor = 'darkred'; // Change the background color to dark red

    }
}






document.addEventListener("DOMContentLoaded", () => {

    onload(); // hopefully this loads after the dom content is loaded
    textarea.addEventListener("input", textarea_oninput);
});



function get_state_or_null(key: string) {
    return sessionStorage.getItem(key) ?? "";
}
function load_state_from_session_storage() {
    // TODO: add a listener that listens for changes in the session storage runs the parser and updates the UI appropriately. (Triggers ?)
    // this needs to be in a modular fashion, such that I could add listeners to other components of the DOM
    // loads state from session storage - better names -> load_state_from_session_storage
    const result = get_state_or_null(USER_INPUT_STATE_KEY);

    return result;

    // TODO: parse result and display the appropriate colors with the match function

}
function onload() {
    // set the content of the text area to the session storage value if it exists
    const result = load_state_from_session_storage()
    textarea.value = result;

}

function fetch_and_set_textarea() { // TODO: change name
    const textarea = document.getElementById(editorID)! as HTMLTextAreaElement;
    if (sessionStorage.getItem(USER_INPUT_STATE_KEY)) {
        textarea.value = sessionStorage.getItem(USER_INPUT_STATE_KEY) as string;
    } else {
        textarea.value = "";
    }
}   

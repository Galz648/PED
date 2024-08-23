import { parse } from "./parsers.js";
import { root } from "./grammer.js";



const editorID = "editor";
const compiledExpressionID = "compiled_expression";
const tokenDisplayID = "token_display";
const USER_INPUT_STATE_KEY = 'input_text';

// loads dom elements - better names -> load_dom_elements
const textarea = document.getElementById(editorID)! as HTMLTextAreaElement;
const ce_div = document.getElementById(compiledExpressionID)! as HTMLDivElement;
const token_display_div = document.getElementById(tokenDisplayID)! as HTMLDivElement;
const la_button = document.getElementById("btn")! as HTMLButtonElement;



class StateManager<T> {
    state: T
    callback: Function;
    constructor(state: T) {
        this.state = state;
        this.callback = function () { };
    }
    get_state() {
        return this.state;
    }
    set_callback(callback: Function) {
        this.callback = callback;
    }
    set_state(state: T) {
        this.state = state;
        this.callback();
    }
}


let is_valid: boolean = false;
const is_valid_state = new StateManager<boolean>(is_valid);
is_valid_state.set_callback(() => {
    console.log("state changed")
    if (is_valid_state.get_state()) {
        textarea.style.backgroundColor = 'darkgreen';
    } else {
        textarea.style.backgroundColor = 'darkred';
    }
});

la_button.addEventListener("click", () => {
    console.log("clicked")
    is_valid = !is_valid;
    is_valid_state.set_state(is_valid);
});

if (!textarea || !ce_div || !token_display_div || !la_button) {
    throw Error("something went wrong, html elements are missing.")
}



document.addEventListener("DOMContentLoaded", () => {

    onload();
    textarea.addEventListener("input", textarea_oninput);

});


const textarea_oninput = () => {

    // Save the state of the text area to session storage
    sessionStorage.setItem(USER_INPUT_STATE_KEY, textarea.value);

    const expr = textarea.value;
    ce_div.innerText = expr;


    try {
        const result = parse(root, expr);
        token_display_div.innerText = JSON.stringify(result);
        is_valid_state.set_state(result.ok);


        console.log(result)
        if (result.ok && (result.value.remaining.length === 0)) {

            // textarea.style.backgroundColor = 'darkgreen';
            is_valid_state.set_state(true);
        }
        if (!result.ok) {
            // textarea.style.backgroundColor = 'darkred';
            is_valid_state.set_state(false);
            throw new Error("result not okay")

        }
        if (result.ok && result.value.remaining.length > 0) {
            // textarea.style.backgroundColor = 'darkred';
            is_valid_state.set_state(false);
            throw new Error("inadquate parser for the input or other stuff")
        }

    } catch (e) {
        console.error(e)
        // textarea.style.backgroundColor = 'darkred';
        is_valid_state.set_state(false);
    }
}


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
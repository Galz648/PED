
import { basic_bin_op, parse } from "./parsers.js";

const editorID = "editor";
const compiledExpressionID = "compiled_expression";
const tokenDisplayID = "token_display";

const USER_INPUT_STATE_KEY = 'input_text';

// loads dom elements - better names -> load_dom_elements
const textarea = document.getElementById(editorID)! as HTMLTextAreaElement;
const ce_div = document.getElementById(compiledExpressionID)! as HTMLDivElement;
const token_display_div = document.getElementById(tokenDisplayID)! as HTMLDivElement;

if (!textarea || !ce_div || !token_display_div) {
    throw Error("something went wrong, html elements are missing.")
}


document.addEventListener("DOMContentLoaded", () => {

    onload(); // hopefully this loads after the dom content is loaded
    textarea.addEventListener('input', () => { // the function implementation should move to a function
        // Save the state of the text area to session storage
        sessionStorage.setItem(USER_INPUT_STATE_KEY, textarea.value);

        const expr = textarea.value;
        ce_div.innerText = expr;

        try {
            const result = parse(basic_bin_op, expr);
            const is_valid = result.length > 0 && result[0][1] === ""; // TODO: encapsulate the logic of the evaluating a result in a function
            is_valid ? textarea.style.backgroundColor = 'darkgreen' : textarea.style.backgroundColor = 'darkred';
        } catch (e) {
            console.error(e)
            textarea.style.backgroundColor = 'darkred'; // Change the background color to dark red
        }

    });
});



function get_state_or_null(key: string) {
    return sessionStorage.getItem(key) ?? "";
}
function load_state_from_session_storage() {
    // loads state from session storage - better names -> load_state_from_session_storage
    const result = get_state_or_null(USER_INPUT_STATE_KEY);

    if (result) {
        document.getElementById(editorID)!.innerText = result;
        // parse the result and display the appropriate colors
        const parsing_result = parse(basic_bin_op, result)
        // if the parsing result is valid, set the background color to green
        if (parsing_result.length > 0 && parsing_result[0][1] === "") { // TODO: encapsulate the logic of the evaluating a result in a function / handle differently
            document.getElementById(editorID)!.style.backgroundColor = 'darkgreen';
        } else {
            // if the parsing result is invalid, set the background color to red
            document.getElementById(editorID)!.style.backgroundColor = 'darkred';

        }
    }

}
    function onload() {
        // set the content of the text area to the session storage value if it exists
        load_state_from_session_storage()

    }
 
import * as monaco from 'monaco-editor';

const editor = monaco.editor.getEditors()[0]

import { textToHtmlFragment } from './encoder';

// Get the right pane element where rendered content will be displayed
const rightPane = document.getElementById('right-pane');

if (!rightPane) {
    throw new Error('Right pane element not found');
}

/**
 * Updates the rendered view with parsed content from the editor
 */
function updateRenderedView(editor: monaco.editor.ICodeEditor) {
    const content = editor.getValue();
    const fragment = textToHtmlFragment(content);

    // Clear existing content
    rightPane!.innerHTML = '';

    // Render new elements
    rightPane!.appendChild(fragment);
}

// Listen for content changes in the editor
editor.onDidChangeModelContent((event) => {
    updateRenderedView(editor);
});

// Initial render
updateRenderedView(editor);

/**
 * Gets the current cursor position in the editor
 */
function getCursorPosition(): monaco.Position {
    return editor.getPosition() || new monaco.Position(1, 1);
}

/**
 * Gets the current selection in the editor
 */
function getSelection(): monaco.Selection {
    return editor.getSelection() || new monaco.Selection(1, 1, 1, 1);
}

/**
 * Inserts text at the current cursor position
 */
function insertTextAtCursor(text: string) {
    const position = getCursorPosition();
    editor.executeEdits('', [
        {
            range: new monaco.Range(
                position.lineNumber,
                position.column,
                position.lineNumber,
                position.column
            ),
            text: text
        }
    ]);
}

/**
 * Replaces the current selection with new text
 */
function replaceSelection(newText: string) {
    const selection = getSelection();
    editor.executeEdits('', [
        {
            range: selection,
            text: newText
        }
    ]); 
}

/**
 * Gets the text of the current selection
 */
function getSelectedText(): string {
    const selection = getSelection();
    const model = editor.getModel();
    if (!model) return '';
    return model.getValueInRange(selection);
}


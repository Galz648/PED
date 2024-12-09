import * as monaco from 'monaco-editor';

const editor = monaco.editor.getEditors()[0]

import { textToHtmlFragment } from './encoder.js';

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

// // Listen for content changes in the editor
editor.onDidChangeModelContent((event) => {
    updateRenderedView(editor);
});

// // Initial render
updateRenderedView(editor);

// 

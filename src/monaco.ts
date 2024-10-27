// Import specific functions or objects
import * as monaco from 'monaco-editor';

const containerElement = document.getElementById('container') as HTMLElement
// Initialize the Monaco Editor
monaco.editor.create(containerElement, {
  value: `\frac{A}{B}`,
  language: 'latex',
  theme: 'vs-dark',
  options: {
    fontSize: 14,
    readOnly: false
  }
});

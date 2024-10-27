// Import specific functions or objects



import * as monaco from 'monaco-editor';
import { registerLatexLanguage } from './latexConfig.js'; // Adjust the path as needed

// Register the LaTeX language with Monaco
registerLatexLanguage();

const containerElement = document.getElementById('container') as HTMLElement
// Initialize the Monaco Editor with LaTeX support
monaco.editor.create(containerElement, {
  value: `\\title{Sample Document}\n\\author{Author Name}\n\\date{\\today}\n\n\\begin{document}\n\\section{Introduction}\nThis is a simple LaTeX example.\n\\end{document}`,
  language: 'latex',
  theme: 'vs-dark'
});

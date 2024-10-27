import * as monaco from 'monaco-editor';
import { registerLatexLanguage } from './latexConfig.js'; 

// Register the LaTeX language with Monaco
registerLatexLanguage();

const containerElement = document.getElementById('container') as HTMLElement
// Initialize the Monaco Editor with LaTeX support
monaco.editor.create(containerElement, {
  value: `\\title{Sample Document}\n\\author{Author Name}\n\\date{\\today}\n\n\\begin{document}\n\\section{Introduction}\nThis is a simple LaTeX example.\n\\end{document}\n\\frac{A}{B}`,
  language: 'latex',
  theme: 'vs-dark'
});


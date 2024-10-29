// latexConfig.js
import * as monaco from 'monaco-editor';

export function registerLatexLanguage() {
    // Register LaTeX language
    monaco.languages.register({ id: 'latex' });

    // Define LaTeX syntax highlighting rules
    monaco.languages.setMonarchTokensProvider('latex', {
        keywords: ['\\begin', '\\end', '\\section', '\\textbf', '\\textit', '\\item', '\\title', '\\author', '\\date', '\\frac'],
        tokenizer: {
            root: [
                [/\\[a-zA-Z]+/, { cases: { '@keywords': 'keyword', '@default': 'identifier' } }],
                [/%.*/, 'comment'], // LaTeX comments start with '%'
                [/{|}/, 'delimiter.bracket'], // Brackets for LaTeX blocks
                [/".*?"/, 'string'], // String handling for titles or labels
                [/\d+/, 'number']
            ]
        }
    });

    // Set LaTeX language configuration
    monaco.languages.setLanguageConfiguration('latex', {
        comments: {
            lineComment: '%'
        },
        brackets: [
            ['{', '}']
        ],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '"', close: '"' }
        ]
    });


    // Add a snippet for \frac
    monaco.languages.registerCompletionItemProvider('latex', {
        provideCompletionItems: (model, position) => {
            const wordRange = model.getWordUntilPosition(position);
            const suggestions = [
                {
                    label: '\\frac',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'frac{${1:numerator}}{${2:denominator}}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Insert a fraction: \\frac{}{}',
                    range: {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: wordRange.startColumn,
                        endColumn: wordRange.endColumn
                    }
                }
            ];
            return { suggestions };
        }
    });
}

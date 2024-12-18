import * as monaco from 'monaco-editor';

export function registerLatexSnippets() {
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
                },
                {
                    label: '\\sum',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'sum_{${1:lower}}^{${2:upper}} ${3:expression}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Insert a summation: \\sum_{}^{}',
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
import type { Monaco } from "@monaco-editor/react";

export function registerLatexSnippets(monaco: Monaco) {
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
                },
                {
                    label: 'latex',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '$$ ${1:equation} $$',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Insert a math block: $$ $$',
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

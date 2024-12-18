import * as monaco from 'monaco-editor';
import { editorState } from './services/EditorState.ts';

export class EditorBridge {
    constructor(
        private editor: monaco.editor.ICodeEditor,
        private renderPane: HTMLElement
    ) {
        this.setupEditor();
        this.setupSubscriptions();
    }

    private setupEditor() {
        this.editor.onDidChangeModelContent(() => {
            editorState.updateContent(this.editor.getValue());
        });
    }

    private setupSubscriptions() {
        editorState.content$.subscribe(content => {
            const currentContent = this.editor.getValue();
            if (currentContent !== content) {
                const position = this.editor.getPosition();
                this.editor.setValue(content);
                position && this.editor.setPosition(position);
            }
        });
    }
}

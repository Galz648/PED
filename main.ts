import { TextEditor } from './textEditor';

document.addEventListener('DOMContentLoaded', () => {
    const editor = new TextEditor('editor', 'cursorPosition');

    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    const newLineBtn = document.getElementById('newLine') as HTMLButtonElement;
    const deleteLastBtn = document.getElementById('deleteLast') as HTMLButtonElement;

    textarea.addEventListener('input', (e: Event) => {
        const inputEvent = e as InputEvent;
        if (inputEvent.inputType === 'insertText') {
            editor.insertCharacter(inputEvent.data || '');
        } else if (inputEvent.inputType === 'deleteContentBackward') {
            editor.deleteCharacter();
        }
    });

    newLineBtn.addEventListener('click', () => {
        editor.newLine();
        textarea.focus();
    });

    deleteLastBtn.addEventListener('click', () => {
        editor.deleteCharacter();
        textarea.focus();
    });
});
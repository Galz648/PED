export class TextEditor {
  private content: string[];
  private cursorPosition: { line: number; column: number };
  private textarea: HTMLTextAreaElement;
  private cursorPositionElement: HTMLElement;

  constructor(textareaId: string, cursorPositionId: string) {
      this.content = [''];
      this.cursorPosition = { line: 0, column: 0 };
      this.textarea = document.getElementById(textareaId) as HTMLTextAreaElement;
      this.cursorPositionElement = document.getElementById(cursorPositionId) as HTMLElement;
      this.updateTextarea();
  }

  insertCharacter(char: string): void {
      const { line, column } = this.cursorPosition;
      const currentLine = this.content[line];
      this.content[line] = currentLine.slice(0, column) + char + currentLine.slice(column);
      this.moveCursor('right');
      this.updateTextarea();
  }

  deleteCharacter(): void {
      const { line, column } = this.cursorPosition;
      if (column > 0) {
          const currentLine = this.content[line];
          this.content[line] = currentLine.slice(0, column - 1) + currentLine.slice(column);
          this.moveCursor('left');
      } else if (line > 0) {
          const previousLine = this.content[line - 1];
          const currentLine = this.content[line];
          this.content[line - 1] = previousLine + currentLine;
          this.content.splice(line, 1);
          this.cursorPosition = { line: line - 1, column: previousLine.length };
      }
      this.updateTextarea();
  }

  newLine(): void {
      const { line, column } = this.cursorPosition;
      const currentLine = this.content[line];
      const newLine = currentLine.slice(column);
      this.content[line] = currentLine.slice(0, column);
      this.content.splice(line + 1, 0, newLine);
      this.cursorPosition = { line: line + 1, column: 0 };
      this.updateTextarea();
  }

  moveCursor(direction: 'up' | 'down' | 'left' | 'right'): void {
      const { line, column } = this.cursorPosition;
      switch (direction) {
          case 'up':
              if (line > 0) {
                  this.cursorPosition.line--;
                  this.cursorPosition.column = Math.min(column, this.content[line - 1].length);
              }
              break;
          case 'down':
              if (line < this.content.length - 1) {
                  this.cursorPosition.line++;
                  this.cursorPosition.column = Math.min(column, this.content[line + 1].length);
              }
              break;
          case 'left':
              if (column > 0) {
                  this.cursorPosition.column--;
              } else if (line > 0) {
                  this.cursorPosition.line--;
                  this.cursorPosition.column = this.content[line - 1].length;
              }
              break;
          case 'right':
              if (column < this.content[line].length) {
                  this.cursorPosition.column++;
              } else if (line < this.content.length - 1) {
                  this.cursorPosition.line++;
                  this.cursorPosition.column = 0;
              }
              break;
      }
      this.updateCursorPosition();
  }

  private updateTextarea(): void {
      this.textarea.value = this.content.join('\n');
      this.updateCursorPosition();
  }

  private updateCursorPosition(): void {
      const { line, column } = this.cursorPosition;
      this.cursorPositionElement.textContent = `Line: ${line + 1}, Column: ${column + 1}`;
  }
}
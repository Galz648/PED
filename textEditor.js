var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var TextEditor = /** @class */ (function () {
    function TextEditor() {
        this.content = [''];
        this.cursorPosition = { line: 0, column: 0 };
    }
    TextEditor.prototype.insertCharacter = function (char) {
        var _a = this.cursorPosition, line = _a.line, column = _a.column;
        var currentLine = this.content[line];
        this.content[line] = currentLine.slice(0, column) + char + currentLine.slice(column);
        this.moveCursor('right');
    };
    TextEditor.prototype.deleteCharacter = function () {
        var _a = this.cursorPosition, line = _a.line, column = _a.column;
        if (column > 0) {
            var currentLine = this.content[line];
            this.content[line] = currentLine.slice(0, column - 1) + currentLine.slice(column);
            this.moveCursor('left');
        }
        else if (line > 0) {
            var previousLine = this.content[line - 1];
            var currentLine = this.content[line];
            this.content[line - 1] = previousLine + currentLine;
            this.content.splice(line, 1);
            this.cursorPosition = { line: line - 1, column: previousLine.length };
        }
    };
    TextEditor.prototype.newLine = function () {
        var _a = this.cursorPosition, line = _a.line, column = _a.column;
        var currentLine = this.content[line];
        var newLine = currentLine.slice(column);
        this.content[line] = currentLine.slice(0, column);
        this.content.splice(line + 1, 0, newLine);
        this.cursorPosition = { line: line + 1, column: 0 };
    };
    TextEditor.prototype.moveCursor = function (direction) {
        var _a = this.cursorPosition, line = _a.line, column = _a.column;
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
                }
                else if (line > 0) {
                    this.cursorPosition.line--;
                    this.cursorPosition.column = this.content[line - 1].length;
                }
                break;
            case 'right':
                if (column < this.content[line].length) {
                    this.cursorPosition.column++;
                }
                else if (line < this.content.length - 1) {
                    this.cursorPosition.line++;
                    this.cursorPosition.column = 0;
                }
                break;
        }
    };
    TextEditor.prototype.getContent = function () {
        return this.content.join('\n');
    };
    TextEditor.prototype.getCursorPosition = function () {
        return __assign({}, this.cursorPosition);
    };
    return TextEditor;
}());

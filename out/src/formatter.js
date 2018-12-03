"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ALCTypingFormatter {
    provideOnTypeFormattingEdits(document, position, ch, options, token) {
        const lineText = document.lineAt(position.line).text;
        const lineRange = document.lineAt(position.line).range;
        const commentIndentRegex = /^(.+?)(\s*)(;.*)$/;
        const result = lineText.match(commentIndentRegex);
        if (result) {
            const pre = result[1];
            const post = result[3];
            if (pre.length < 40) {
                let output = pre;
                while (output.length < 40) {
                    output += " ";
                }
                output += post;
                return [new vscode.TextEdit(lineRange, output)];
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
}
exports.ALCTypingFormatter = ALCTypingFormatter;
//# sourceMappingURL=formatter.js.map
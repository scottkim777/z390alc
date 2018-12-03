"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const shouldSuggestInstructionRegex = /^(\@?((\$\$(?!\.))?[\w\.]+)[:\s])?\s*(\w+)?(?!.+)$/;
//*const shouldSuggest1ArgRegisterRegex = /(?:(pop|push)|(LR|in|s[lr]a|s[lr]l|slia|sub|and|x?or)|(ex|ld|inc|dec|adc|add|sbc))\s+([a-z]\w*|\([^\)]+?\))$/i;
//const shouldSuggest1ArgRegisterRegex = /(LR|r[lr]c?|DR|sbc)\s+(\w+|\([^\)]+?\))(,\s*?\(?[^\(\n]*)$/i;
//const shouldSuggest2ArgRegisterRegex = /(LR|r[lr]c?|DR|sbc)\s+(\w+|\([^\)]+?\))(,\s*?\(?[^\(\n]*)$/i;
const instructionSet = [
    'xx1\t', 'xx2\t', 'xx3\t', 'xx4\t', 'xx5\t', 'xx6\n', 'xx7\t', 'xx8\n'
];
const registers = [
    'R0', 'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8',
    'R9', 'R10', 'R11', 'R12', 'R13', 'R14', 'R15'
];
class ALCCompletionProposer {
    constructor(symbolDocumenter) {
        this.symbolDocumenter = symbolDocumenter;
    }
    provideCompletionItems(document, position, token, context) {
        const line = document.lineAt(position.line).text;
        if (shouldSuggestInstructionRegex.test(line)) {
            return instructionSet.map(snippet => {
                const item = new vscode.CompletionItem(snippet.trim(), vscode.CompletionItemKind.Keyword);
                item.insertText = new vscode.SnippetString(`${snippet}$0`);
                item.commitCharacters = ['\t'];
                return item;
            });
        }
        let output = [];
/*
        const shouldSuggest1ArgRegisterMatch = shouldSuggest1ArgRegisterRegex.exec(line);
        const shouldSuggest2ArgRegisterMatch = shouldSuggest2ArgRegisterRegex.exec(line);
        if (shouldSuggest2ArgRegisterMatch) {
            if (shouldSuggest2ArgRegisterMatch[1].toLowerCase() === 'ex' &&
                shouldSuggest2ArgRegisterMatch[2].toLowerCase() === 'af') {
                const item = new vscode.CompletionItem("af'", vscode.CompletionItemKind.Value);
                item.insertText = new vscode.SnippetString(`af'\n$0`);
                item.commitCharacters = ['\n'];
                return [item];
            }
            else {
                output = registers.map((snippet, idx) => {
                    const item = new vscode.CompletionItem(snippet, vscode.CompletionItemKind.Value);
                    item.insertText = new vscode.SnippetString(`${snippet.replace('*', '${1:0}')}\n$0`);
                    item.commitCharacters = ['\n'];
                    // put to the top of the list...
                    item.sortText = `!${idx.toString(36)}`;
                    return item;
                });
            }
        }
        else if (shouldSuggest1ArgRegisterMatch) {
            
            let idxStart = 0, idxEnd = undefined;
            if (shouldSuggest1ArgRegisterMatch[1]) {
                idxStart = 26;
                idxEnd = 31;
            }
            else if (shouldSuggest1ArgRegisterMatch[2]) {
                idxEnd = 25;
            }
*/
            output = registers.slice(idxStart, idxEnd).map((snippet, idx) => {
                const item = new vscode.CompletionItem(snippet, vscode.CompletionItemKind.Value);
                item.insertText = new vscode.SnippetString(`${snippet.replace('*', '${1:0}')}\n$0`);
                item.commitCharacters = ['\n'];
                // put to the top of the list...
                item.sortText = `!${idx.toString(36)}`;
                return item;
            });
       // }
  
        const symbols = this.symbolDocumenter.symbols(document);
        for (const name in symbols) {
            if (symbols.hasOwnProperty(name)) {
                const symbol = symbols[name];
                const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Variable);
                if (symbol.documentation) {
                    item.documentation = new vscode.MarkdownString(symbol.documentation);
                }
                item.sortText = name;
                output.push(item);
            }
        }
        return output;
    }
}
exports.ALCCompletionProposer = ALCCompletionProposer;
//# sourceMappingURL=completionProposer.js.map
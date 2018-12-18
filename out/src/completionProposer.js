"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const shouldSuggestInstructionRegex = /^(\@?((\$\$(?!\.))?[\w\.]+)[:\s])?\s*(\w+)?(?!.+)$/;
const instructionSet = [
    'Z1\t'
];
const registers = [
    'R0'
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
            output = registers.slice(idxStart, idxEnd).map((snippet, idx) => {
                const item = new vscode.CompletionItem(snippet, vscode.CompletionItemKind.Value);
                item.insertText = new vscode.SnippetString(`${snippet.replace('*', '${1:0}')}\n$0`);
                item.commitCharacters = ['\n'];
                // put to the top of the list...
                item.sortText = `!${idx.toString(36)}`;
                return item;
            });
  
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const hover_1 = require("./hover");
const symbolDocumenter_1 = require("./symbolDocumenter");
const completionProposer_1 = require("./completionProposer");
const definitionProvider_1 = require("./definitionProvider");
const symbolProvider_1 = require("./symbolProvider");
let symbolDocumenter;
function activate(ctx) {
    const languageSelector = { language: "z390-alc", scheme: "file" };
    symbolDocumenter = new symbolDocumenter_1.ALCSymbolDocumenter();
    ctx.subscriptions.push(vscode.languages.registerHoverProvider(languageSelector, new hover_1.ALCHoverProvider(symbolDocumenter)));
    ctx.subscriptions.push(vscode.languages.registerCompletionItemProvider(languageSelector, new completionProposer_1.ALCCompletionProposer(symbolDocumenter), ','));
    ctx.subscriptions.push(vscode.languages.registerDefinitionProvider(languageSelector, new definitionProvider_1.ALCDefinitionProvider(symbolDocumenter)));
    ctx.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(languageSelector, new symbolProvider_1.ALCDocumentSymbolProvider(symbolDocumenter)));
    ctx.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(new symbolProvider_1.ALCWorkspaceSymbolProvider(symbolDocumenter)));
}
exports.activate = activate;
function deactivate() {
    if (symbolDocumenter) {
        symbolDocumenter.destroy();
        symbolDocumenter = undefined;
    }
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ALCDocumentSymbolProvider {
    constructor(symbolDocumenter) {
        this.symbolDocumenter = symbolDocumenter;
    }
    provideDocumentSymbols(document, token) {
        return this.symbolDocumenter.provideSymbols(document.fileName, null, token);
    }
}
exports.ALCDocumentSymbolProvider = ALCDocumentSymbolProvider;
class ALCWorkspaceSymbolProvider {
    constructor(symbolDocumenter) {
        this.symbolDocumenter = symbolDocumenter;
    }
    provideWorkspaceSymbols(query, token) {
        return this.symbolDocumenter.provideSymbols(null, query, token);
    }
}
exports.ALCWorkspaceSymbolProvider = ALCWorkspaceSymbolProvider;
//# sourceMappingURL=symbolProvider.js.map
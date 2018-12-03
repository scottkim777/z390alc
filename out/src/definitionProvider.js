"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ALCDefinitionProvider {
    constructor(symbolDocumenter) {
        this.symbolDocumenter = symbolDocumenter;
    }
    provideDefinition(document, position, token) {
        return this.symbolDocumenter.getFullSymbolAtDocPosition(document, position, token);
    }
}
exports.ALCDefinitionProvider = ALCDefinitionProvider;
//# sourceMappingURL=definitionProvider.js.map
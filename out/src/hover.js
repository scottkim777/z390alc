"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ALCHoverProvider {
    constructor(symbolDocumenter) {
        this.symbolDocumenter = symbolDocumenter;
    }
    provideHover(document, position, token) {
        return this.symbolDocumenter.getFullSymbolAtDocPosition(document, position, token, true);
    }
}
exports.ALCHoverProvider = ALCHoverProvider;
//# sourceMappingURL=hover.js.map
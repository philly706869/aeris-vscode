import {
  CancellationToken,
  DocumentSemanticTokensProvider,
  SemanticTokens,
  SemanticTokensBuilder,
  TextDocument,
} from "vscode";

export class AERISSemanticProvider implements DocumentSemanticTokensProvider {
  async provideDocumentSemanticTokens(
    document: TextDocument,
    token: CancellationToken
  ): Promise<SemanticTokens> {
    const text = document.getText();

    // TODO: get token data from AERIS LS

    const builder = new SemanticTokensBuilder();

    // for (const token of tokens) {
    //   builder.push(
    //     token.line,
    //     token.startChar,
    //     token.length,
    //     encodeTokenType(token.type),
    //     encodeTokenModifier(token.modifiers)
    //   );
    // }

    return builder.build();
  }
}

import {
  CancellationToken,
  Disposable,
  DocumentSelector,
  DocumentSemanticTokensProvider,
  languages,
  SemanticTokens,
  SemanticTokensBuilder,
  SemanticTokensLegend,
  TextDocument,
} from "vscode";

class Provider implements DocumentSemanticTokensProvider {
  public constructor(private readonly legend: SemanticTokensLegend) {}

  public async provideDocumentSemanticTokens(
    document: TextDocument,
    token: CancellationToken
  ): Promise<SemanticTokens> {
    const builder = new SemanticTokensBuilder(this.legend);
    return builder.build();
  }
}

class AERISSemanticTokensProvider {
  private readonly selector: DocumentSelector;
  private readonly legend: SemanticTokensLegend;
  private readonly provider: Provider;

  public constructor() {
    this.selector = { language: "aeris" };
    const tokenTypes: string[] = [];
    const tokenModifiers: string[] = [];
    this.legend = new SemanticTokensLegend(tokenTypes, tokenModifiers);
    this.provider = new Provider(this.legend);
  }

  public register(): Disposable {
    return languages.registerDocumentSemanticTokensProvider(
      this.selector,
      this.provider,
      this.legend
    );
  }
}

export { AERISSemanticTokensProvider };

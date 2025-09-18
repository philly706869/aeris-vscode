import * as vscode from "vscode";
import { AERISSemanticProvider } from "./AERISSemanticProvider.js";

export function activate(context: vscode.ExtensionContext) {
  const legend = new vscode.SemanticTokensLegend([], []);

  context.subscriptions.push(
    vscode.languages.registerDocumentSemanticTokensProvider(
      { language: "aeris" },
      new AERISSemanticProvider(),
      legend
    )
  );
}

export function deactivate() {}

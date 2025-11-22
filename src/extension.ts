import { AERISSemanticTokensProvider } from "@src/provider";
import { ExtensionContext } from "vscode";

export function activate(context: ExtensionContext) {
  const provider = new AERISSemanticTokensProvider();
  const disposable = provider.register();
  context.subscriptions.push(disposable);
}

export function deactivate() {}

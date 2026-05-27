import type {
  DocumentSelector,
  DocumentSemanticTokensProvider,
  ExtensionContext,
} from "vscode";
import {
  commands,
  languages,
  SemanticTokensLegend,
  StatusBarAlignment,
  window,
  workspace,
} from "vscode";

export const activate = async (context: ExtensionContext) => {
  const COMMAND_STATUS = "aeris-vscode.status";

  context.subscriptions.push(
    commands.registerCommand(COMMAND_STATUS, () => {
      window.showInformationMessage("Status!");
    }),
  );

  const statusItem = window.createStatusBarItem(StatusBarAlignment.Left);
  context.subscriptions.push(statusItem);
  statusItem.command = COMMAND_STATUS;
  statusItem.name = "AERIS";
  statusItem.text = "$(loading~spin) AERIS";
  statusItem.tooltip = "Detecting roots...";
  statusItem.show();

  try {
    const roots = await workspace.findFiles("**/aeris.aeris", "**/{.git}/**");
    let detectedCount = 0;
    for (const root of roots) {
      if (root.scheme !== "file") {
        continue;
      }
      try {
        const document = await workspace.openTextDocument(root);
        await languages.setTextDocumentLanguage(document, "aeris");
        detectedCount += 1;
      } catch {}
    }

    if (detectedCount > 0) {
      statusItem.text = "AERIS";
      statusItem.tooltip = `Root detected (${detectedCount})`;
    } else {
      statusItem.hide();
    }
  } catch {
    statusItem.text = "$(error) AERIS";
    statusItem.tooltip = "Root detection failed";
  }

  const tokenTypes = ["class", "interface", "enum", "function", "variable"];
  const tokenModifiers = ["declaration", "documentation"];
  const legend = new SemanticTokensLegend(tokenTypes, tokenModifiers);

  const provider: DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(document, token) {},
  };

  const selector: DocumentSelector = { language: "aeris", scheme: "file" };

  context.subscriptions.push(
    languages.registerDocumentSemanticTokensProvider(
      selector,
      provider,
      legend,
    ),
  );
};

export const deactivate = () => {};

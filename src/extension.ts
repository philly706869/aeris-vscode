import path from "node:path";
import type { ExtensionContext } from "vscode";
import * as vscode from "vscode";

export const activate = (ctx: ExtensionContext) => {
  ctx.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(async (document) => {
      if (path.extname(document.fileName) === "aeris") {
        await vscode.languages.setTextDocumentLanguage(document, "aeris");
      }
    }),
  );
};

export const deactivate = () => {};

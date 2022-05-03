import * as vscode from 'vscode';
import * as commands from './commands';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "open-file-from-github-url-in-vs-code" is now active!');

	let disposable = vscode.commands.registerCommand('open-file-from-github-url-in-vs-code.openFile', async () => {
		let url = await vscode.window.showInputBox({ placeHolder: 'GitHub URL' });
		if (url) { commands.openFile(url); }
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }

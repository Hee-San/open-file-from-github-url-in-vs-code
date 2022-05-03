import * as assert from 'assert';
import * as vscode from 'vscode';
import * as commands from '../../commands';

suite('Commands Test Suite', () => {
	vscode.window.showInformationMessage('Start commands tests.');

	test('parseGithubUrl', () => {
		let url = 'https://github.com/user-name/repo-name/blob/branch/folder1/folder2/file.name';
		let quickOpenPrefix = commands.parseGithubUrl(url);
		assert.strictEqual(quickOpenPrefix, 'folder1/folder2/file.name');

		url = 'https://github.com/user-name/repo-name/blob/branch/folder1/folder2/file.name#L5';
		quickOpenPrefix = commands.parseGithubUrl(url);
		assert.strictEqual(quickOpenPrefix, 'folder1/folder2/file.name:5');

		url = 'https://github.com/user-name/repo-name/blob/branch/folder1/folder2/file.name#L5-L20';
		quickOpenPrefix = commands.parseGithubUrl(url);
		assert.strictEqual(quickOpenPrefix, 'folder1/folder2/file.name:5');
	});
});

'use strict';
import * as vs from 'vscode';

export function openFile(githubUrl: string): void {
    let quickOpenPrefix: string = parseGithubUrl(githubUrl);
    vs.commands.executeCommand('workbench.action.quickOpen', quickOpenPrefix);
}

export function parseGithubUrl(githubUrl: string): string {
    let matches = githubUrl.match(/https:\/\/github\.com\/.+\/blob\/[^\/]+\/([^#]+)(#L\d+|#L\d+\-L\d+|)$/);

    if (matches === null || matches.length !== 3) { throw new Error('Failed to parse github url: ' + githubUrl); }

    let filePath = matches[1];

    if (matches[2].length > 0) {
        let line = matches[2].match(/^#L(\d+)/);
        if (line === null) { throw new Error('Failed to parse line range: ' + matches[2]); }
        filePath += ':' + line[1];
    }

    console.log('filePath: ' + filePath);
    return filePath;
}

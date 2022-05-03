'use strict';
import * as vs from 'vscode';

export function openFile(githubUrl: string): void {
    let quickOpenPrefix: string = parseGithubUrl(githubUrl);
    vs.commands.executeCommand('workbench.action.quickOpen', quickOpenPrefix);
}

export function parseGithubUrl(githubUrl: string): string {
    let re = /https:\/\/github\.com\/.+\/blob\/[^\/]+\/(.*)/;
    let matches = re.exec(githubUrl);
    if (matches === null) { throw new Error('Failed to parse github url: ' + githubUrl); }

    let filePath = matches[1].split('#')[0];

    let lineRange = matches[1].split('#')[1];
    if (lineRange) {
        let lineRangeRe = /L(\d+)-L(\d+)/;
        let lineRangeMatches = lineRangeRe.exec(lineRange);
        if (lineRangeMatches === null) { throw new Error('Failed to parse line range: ' + lineRange); }
        filePath += ':' + lineRangeMatches[1];
    }

    console.log('filePath: ' + filePath);
    return filePath;
}

'use strict';
import * as vs from 'vscode';

type File = {
    filePath: string;
};

export function openFile(githubUrl: string): void {
    let file: File = parseGithubUrl(githubUrl);
    // vscodeOpenFile(file);
    vs.window.showInformationMessage(`Open ${file.filePath}`);
}

export function parseGithubUrl(githubUrl: string): File {
    let re = /https:\/\/github\.com\/.+\/blob\/[^\/]+\/(.*)/;
    let matches = re.exec(githubUrl);
    if (matches === null) { throw new Error('Failed to parse github url: ' + githubUrl); }

    let filePath = matches[1].split('#')[0];

    console.log('filePath: ' + filePath);

    return {
        filePath: filePath,
    };
}

import { createInterface } from 'readline';

export function nkStdinReader(): Promise<string[]> {
    return new Promise(resolve => {
        const stdin = createInterface(process.stdin);
        const output: string[] = [];

        let lines: number;
        stdin.on('line', line => {
            output.push(line);
            if (output.length === 1) {
                lines = +line.split(' ')[0];
            } else if (--lines === 0) {
                stdin.close();
                resolve(output);
            }
        });
    });
}

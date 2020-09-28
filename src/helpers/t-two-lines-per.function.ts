import { createInterface } from 'readline';

export function tTwoLinesPerStdin(): Promise<[string, string][]> {
    return new Promise(resolve => {
        const stdin = createInterface(process.stdin);

        let t: number | undefined;
        let prevLine: string | undefined;
        let output: [string, string][] = [];
        stdin.on('line', line => {
            if (typeof t !== 'number') {
                t = +line;
            } else {
                if (prevLine) {
                    output.push([prevLine, line]);
                    prevLine = undefined;
                    if (output.length === t) {
                        resolve(output);
                        stdin.close();
                    }
                } else {
                    prevLine = line;
                }
            }
        });
    });
}
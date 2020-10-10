import { createInterface } from 'readline';

export function nInFirstLineArrayStdin(nIndex: number): Promise<[number[], string[]]> {
    return new Promise(resolve => {
        const stdin = createInterface(process.stdin);

        let n: number | undefined;
        let firstLine: number[];
        let output: string[] = [];
        stdin.on('line', line => {
            if (typeof n !== 'number') {
                firstLine = line.split(' ').map(Number);
                n = firstLine[nIndex];
            } else {
                output.push(line);
                if (--n === 0) {
                    resolve([firstLine, output]);
                    stdin.close();
                }
            }
        });
    });
}
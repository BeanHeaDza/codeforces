import { createInterface } from "readline";

export function constantNumberofLinesStdin(lines: number): Promise<string[]> {
    return new Promise(resolve => {
        const stdin = createInterface(process.stdin);

        const output: string[] = [];
        stdin.on('line', line => {
            output.push(line);
            if (output.length === lines) {
                resolve(output);
                stdin.close();
            }
        });
    });
}
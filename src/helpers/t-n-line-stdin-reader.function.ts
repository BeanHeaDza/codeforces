import { createInterface } from 'readline';
import { Observable } from 'rxjs';

export function tnLineStdinReader(): Observable<string> {
    return new Observable(subscribe => {
        const stdin = createInterface(process.stdin);
        const output: string[] = [];

        let tests: number | null = null;
        let n: number | null = null;
        stdin.on('line', line => {
            if (tests === null) {
                tests = +line;
            } else if (n === null) {
                n = +line;
                tests--;
            } else {
                n = null;
                subscribe.next(line);
                output.push(line);
                if (tests === 0) {
                    stdin.close();
                    subscribe.complete();
                }
            }
        });
    });
}

import { Observable } from 'rxjs';
import { createInterface } from 'readline';

export function readStdin(): Observable<string> {
    const stdin = createInterface(process.stdin);
    return new Observable(subscribe => {
        stdin.on('line', line => subscribe.next(line));
        return () => stdin.close();
    });
}

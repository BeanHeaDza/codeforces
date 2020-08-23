import { readStdin } from '../../helpers';
import { skip, take, map } from 'rxjs/operators';

// https://codeforces.com/contest/1287/problem/C

type GapSide = 'any' | 'odd' | 'even';
type Gap = { left: GapSide; right: GapSide; distance: number };

readStdin()
    .pipe(
        skip(1),
        take(1),
        map(line => line.split(' ').map(n => +n)),
    )
    .subscribe(numbers => {
        let knownOdd = 0,
            knownEven = 0;
        let complexity = 0;

        const gaps: Gap[] = [];

        for (let x = 0; x < numbers.length; x++) {
            if (numbers[x] === 0) {
                const left: GapSide = x === 0 ? 'any' : numbers[x - 1] % 2 === 0 ? 'even' : 'odd';
                const start = x;
                while (x < numbers.length && numbers[x] === 0) {
                    x++;
                }
                x--;
                const right: GapSide =
                    x === numbers.length - 1 ? 'any' : numbers[x + 1] % 2 === 0 ? 'even' : 'odd';
                const distance = x - start + 1;
                gaps.push({ left, right, distance });
            } else {
                if (numbers[x] % 2 === 0) {
                    knownEven++;
                } else {
                    knownOdd++;
                }
                if (x > 0 && numbers[x - 1] > 0 && numbers[x - 1] % 2 !== numbers[x] % 2) {
                    complexity += 1;
                }
            }
        }

        let requiredOdd = Math.round(numbers.length / 2);
        let requiredEven = Math.floor(numbers.length / 2);

        let missingOdd = requiredOdd - knownOdd;
        let missingEven = requiredEven - knownEven;

        const doSide = (input: GapSide, distance: number): void => {
            if (input === 'any') {
                complexity += distance === 1 ? 0 : 1;
            } else if (input === 'even') {
                if (missingEven >= distance) {
                    missingEven -= distance;
                } else {
                    complexity += 1;
                }
            } else {
                if (missingOdd >= distance) {
                    missingOdd -= distance;
                } else {
                    complexity += 1;
                }
            }
        };

        const gapWeight = ({ left, right, distance }: Gap): number =>
            left === 'any' || right === 'any' ? distance + 10000 : distance;

        gaps.sort((a, b) => gapWeight(a) - gapWeight(b)).forEach(({ left, right, distance }) => {
            if ((left === 'even' && right === 'odd') || (left === 'odd' && right === 'even')) {
                complexity += 1;
            } else if (left === 'any') {
                doSide(right, distance);
            } else if (right === 'any') {
                doSide(left, distance);
            } else if (left === 'even') {
                if (missingEven >= distance) {
                    missingEven -= distance;
                } else {
                    complexity += 2;
                }
            } else if (left === 'odd') {
                if (missingOdd >= distance) {
                    missingOdd -= distance;
                } else {
                    complexity += 2;
                }
            }
        });

        console.log(complexity);
    });

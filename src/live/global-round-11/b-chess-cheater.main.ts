import { tTwoLinesPerStdin } from "../../helpers/t-two-lines-per.function";

function solve([n, k]: number[], s: string) {
    let i = 0;
    let score = 0;
    let totalLs = 0;
    const innerLGroups: number[] = [];

    // Ignore leading Ls, they will never result in +3 when swapped
    while (s[i] === 'L') {
        i++;
    }
    totalLs += i;

    while (i < s.length) {
        let w = 0;
        while (s[i] === 'W') {
            w++;
            i++;
        }
        if (w) {
            score += w * 2 - 1;
        }

        let l = 0;
        while (s[i] === 'L') {
            l++;
            i++;
        }
        totalLs += l;
        // Ignore trailing Ls, they will never result in +3 when swapped
        if (l && s[i] === 'W') {
            innerLGroups.push(l);
        }
    }

    if (totalLs <= k) {
        console.log(n * 2 - 1);
    } else if (totalLs === n) {
        console.log(Math.max(k * 2 - 1, 0));
    } else {
        for (let x of innerLGroups.sort((a, b) => a - b)) {
            if (x <= k) {
                score += x * 2 + 1;
                k -= x;
            } else {
                score += k * 2;
                k = 0;
            }
        }
        score += k * 2;

        console.log(score);
    }
}

async function main() {
    const input = await tTwoLinesPerStdin();
    input.forEach(([a, b]) => solve(a.split(' ').map(Number), b));
}

main().then();
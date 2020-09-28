import { sum } from '../../helpers/sum.function';
import { tTwoLinesPerStdin } from '../../helpers/t-two-lines-per.function';

function solve(nums: number[]) {
    const s = sum(nums);
    const l = nums.length;

    if (s % l !== 0) {
        return -1;
    }
    nums = [Number.NEGATIVE_INFINITY, ...nums];

    const target = s / l;
    const actions: [number, number, number][] = [];
    const go = (i: number, j: number, x: number) => {
        if (!x) {
            return;
        }
        actions.push([i, j, x]);
        nums[i] -= i * x;
        nums[j] += i * x;
    };

    // Move everything to the first element
    for (let i = 2; i < nums.length; i++) {
        const element = nums[i];
        const rem = element % i;
        if (rem) {
            go(1, i, i - rem);
        }
        const x = Math.ceil(element / i);
        go(i, 1, x);
    }

    // Fill everything to the target value
    for (let i = 2; i < nums.length; i++) {
        go(1, i, target);
    }

    return `${actions.length}\n${actions.map((a) => a.join(' ')).join('\n')}`;
}

async function main() {
    const input = await tTwoLinesPerStdin();
    for (let t = 0; t < input.length; t++) {
        const [line2] = input[t].slice(1);

        const answer = solve(line2.split(' ').map(Number));
        console.log(answer);
    }
}

main().then();

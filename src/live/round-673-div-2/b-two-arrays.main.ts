import { tTwoLinesPerStdin } from '../../helpers/t-two-lines-per.function';

function solve(T: number, arr: number[]) {
    const mid = T / 2;
    let midLeft = true;

    const output: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element === mid) {
            output.push(midLeft ? 1 : 0);
            midLeft = !midLeft;
        } else {
            output.push(element < mid ? 1 : 0);
        }
    }

    return output;
}

async function main() {
    const input = await tTwoLinesPerStdin();
    for (let t = 0; t < input.length; t++) {
        const [line1, line2] = input[t];
        const [T] = line1.split(' ').map(Number).slice(1);
        const a = line2.split(' ').map(Number);

        const answer = solve(T, a);
        console.log(answer.join(' '));
    }
}

main().then();

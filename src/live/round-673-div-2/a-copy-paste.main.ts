import { tTwoLinesPerStdin } from "../../helpers/t-two-lines-per.function";

function solve(k: number, piles: number[]) {
    const sorted = piles.sort((a, b) => a - b);
    let answer = 0;

    for (let i = 1; i < sorted.length; i++) {
        answer += Math.floor((k - sorted[i]) / sorted[0]);
    }

    return answer;
}

async function main() {
    const input = await tTwoLinesPerStdin();
    for (let t = 0; t < input.length; t++) {
        const [line1, line2] = input[t];
        const [k] = line1.split(' ').map(Number).slice(1);
        const a = line2.split(' ').map(Number);

        const answer = solve(k, a);
        console.log(answer);
    }
}

main().then();
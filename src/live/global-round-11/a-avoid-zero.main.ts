import { sum } from "../../helpers/sum.function";
import { tTwoLinesPerStdin } from "../../helpers/t-two-lines-per.function";

function solve(numbers: number[]) {
    const s = sum(numbers);
    if (s === 0) {
        console.log('NO');
    } else {
        console.log('YES');
        console.log(numbers.sort((a, b) => s < 0 ? a - b : b - a).join(' '));
    }
}

async function main() {
    const input = await tTwoLinesPerStdin();
    input.forEach(([_, i]) => solve(i.split(' ').map(Number)));
}

main().then();
import { constantNumberofLinesStdin } from '../../helpers/stdin-readers/constant-number-of-lines.function';

function solve(cards: number[]) {
    const output: string[] = [];
    const n = cards.length;
    const lastIndex = n - 1;

    function isSolved() {
        return n === 1 || cards.slice(1).every((c, i) => c > cards[i]);
    }

    function performAction(groupSizes: number[]) {
        output.push(groupSizes.length + ' ' + groupSizes.join(' '));

        const swapped: number[] = [];
        let index = 0;
        for (const size of groupSizes) {
            swapped.splice(0, 0, ...cards.slice(index, index + size));
            index += size;
        }

        cards = swapped;
    }

    while (!isSolved()) {
        let currentOrder: 'asc' | 'desc';

        if (cards[0] === 1 || cards[lastIndex] === n) {
            currentOrder = 'asc';
        } else if (cards[lastIndex] === 1 || cards[0] === n) {
            currentOrder = 'desc';
        } else {
            currentOrder = n & 1 ? 'asc' : 'desc';
        }

        let leadingDone = 0,
            trailingDone = 0;
        if (currentOrder === 'asc') {
            while (cards[leadingDone] === leadingDone + 1) {
                leadingDone++;
            }
            while (cards[lastIndex - trailingDone] === n - trailingDone) {
                trailingDone++;
            }
        } else {
            while (cards[leadingDone] === n - leadingDone) {
                leadingDone++;
            }
            while (cards[lastIndex - trailingDone] === trailingDone + 1) {
                trailingDone++;
            }
        }
        if (leadingDone === n) {
            trailingDone = 0;
        }

        const lastLeadingDone = cards[leadingDone - 1] || (currentOrder === 'asc' ? 0 : n + 1);
        const targetCard = currentOrder === 'asc' ? lastLeadingDone + 1 : lastLeadingDone - 1;
        const targetIndex = cards.indexOf(targetCard);

        const action: number[] = [];
        for (let x = 0; x < leadingDone; x++) {
            action.push(1);
        }

        if (targetIndex >= 0) {
            const left = targetIndex - leadingDone + 1;
            const right = n - leadingDone - left - trailingDone;

            action.push(left);
            if (right) {
                action.push(right);
            }
        }

        for (let x = 0; x < trailingDone; x++) {
            action.push(1);
        }

        performAction(action);
    }

    console.log(output.length);
    output.forEach((line) => console.log(line));
    // [3] [1 2 4]          Moves: 4
    // [1] [2] [4 3]        Moves: 3
    // 4 3 2 1              Moves: 2
    // 1 2 3 4

    // [6 8 4 9 1] [2 3 7 5]
    // [2 3 7 5 6 8 4 9] [1]
    // [1] [2] [3] [7 5 6 8 4] [9]
    // [9] [7] [5 6 8] [4] [3] [2] [1]
    // [1] [2] [3] [4] [5] [6] [8 7] [9]
    // [9] [8] [7] [6] [5] [4] [3] [2] [1]
    // 1 2 3 4 5 6 7 8 9
}

async function main() {
    const input = await constantNumberofLinesStdin(2);
    solve(input[1].split(' ').map(Number));
}

main().then();

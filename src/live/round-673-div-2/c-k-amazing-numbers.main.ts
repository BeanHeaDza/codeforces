import { tTwoLinesPerStdin } from '../../helpers/t-two-lines-per.function';

function solve(nums: number[]) {
    const track = new Map<number, { maxSpace: number; lastIndex: number }>();

    for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        const t = track.get(element) || { maxSpace: 0, lastIndex: -1 };
        const space = i - t.lastIndex;
        if (space > t.maxSpace) {
            t.maxSpace = space;
        }
        t.lastIndex = i;

        track.set(element, t);
    }

    for (const t of track.values()) {
        const space = nums.length - t.lastIndex;
        if (space > t.maxSpace) {
            t.maxSpace = space;
        }
    }

    const answerPrep: number[] = [];
    for (const [num, t] of track) {
        if (!answerPrep[t.maxSpace] || answerPrep[t.maxSpace] > num) {
            answerPrep[t.maxSpace] = num;
        }
    }

    const answer: number[] = [];
    let lastAnswer = -1;
    for (let i = 1; i <= nums.length; i++) {
        const element = answerPrep[i];
        if (element !== undefined && (lastAnswer === -1 || element < lastAnswer)) {
            lastAnswer = element;
        }
        answer.push(lastAnswer);
    }
    return answer;
}

async function main() {
    const input = await tTwoLinesPerStdin();
    for (let t = 0; t < input.length; t++) {
        const [line2] = input[t].slice(1);

        const answer = solve(line2.split(' ').map(Number));
        console.log(answer.join(' '));
    }
}

main().then();

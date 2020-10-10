import { nInFirstLineArrayStdin } from "../../helpers/stdin-readers/n-in-first-line-array.function";

function solve(celebs: { t: number, x: number, y: number }[]) {
    const scored: { t: number, x: number, y: number, score: number }[] = [];

    for (let x = 0; x < celebs.length; x++) {
        const current = celebs[x];
        let insertIndex = scored.length;
        let groupScore = -1;
        let inserted = false;

        for (let y = scored.length - 1; y >= 0; y--) {
            const previous = scored[y];
            if (groupScore !== previous.score) {
                insertIndex = y + 1;
                groupScore = previous.score;
            }

            if (Math.abs(current.x - previous.x) + Math.abs(current.y - previous.y) + previous.t <= current.t) {
                scored.splice(insertIndex, 0, { ...current, score: previous.score + 1 });
                inserted = true;
                break;
            }
        }

        if (!inserted && current.t >= current.x - 1 + current.y - 1) {
            scored.splice(0, 0, { ...current, score: 1 });
        }
    }

    console.log(scored.length ? scored[scored.length - 1].score : 0);
}

async function main() {
    const input = await nInFirstLineArrayStdin(1);
    solve(input[1].map(line => {
        const [t, x, y] = line.split(' ').map(Number);
        return { t, x, y };
    }));
}

main().then();
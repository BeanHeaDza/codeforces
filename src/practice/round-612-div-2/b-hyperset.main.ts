// https://codeforces.com/problemset/problem/1287/B
import { nkStdinReader } from '../../helpers';

const setCreator = new Map([
    ['EE', 'E'],
    ['ES', 'T'],
    ['ET', 'S'],
    ['SE', 'T'],
    ['SS', 'S'],
    ['ST', 'E'],
    ['TE', 'S'],
    ['TS', 'E'],
    ['TT', 'T'],
]);

function getSetCard(card1: string, card2: string): string {
    let card = '';

    for (let x = 0; x < card1.length; x++) {
        card += setCreator.get(card1[x] + card2[x]);
    }
    return card;
}

nkStdinReader().then(input => {
    const cards = input.slice(1);
    const cardLookup = new Map<string, number>(cards.map((c, i) => [c, i]));
    let output = 0;

    for (let x = 0; x < cards.length - 2; x++) {
        for (let y = x + 1; y < cards.length - 1; y++) {
            const setCard = getSetCard(cards[x], cards[y]);
            if ((cardLookup.get(setCard) || 0) > y) {
                output++;
            }
        }
    }

    console.log(output);
});

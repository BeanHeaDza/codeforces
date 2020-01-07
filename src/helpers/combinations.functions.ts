function factorial(num: number): number {
    if (num < 1 || Math.floor(num) !== num) {
        throw 'factorial can only be calculated on positive whole numbers';
    }
    return num === 1 ? 1 : num * factorial(num - 1);
}

export function combinationsGenerator<T>(inputArr: T[], r: number): T[][] {
    let result: T[][] = [];

    const combine = (arr: T[], m: T[] = []) => {
        if (m.length === r) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                combine(arr.slice(i + 1), m.concat(arr.slice(i, i + 1)));
            }
        }
    };

    combine(inputArr);

    return result;
}

export function combinations(n: number, r: number): number {
    return factorial(n) / (factorial(r) * factorial(n - r));
}

export class SortedArray<T> {
    constructor(private readonly valueSelector = (x: T) => (x as unknown) as number) {}

    
}

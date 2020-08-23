// https://codeforces.com/contest/1287/problem/A
import { tnLineStdinReader } from '../../helpers/t-n-line-stdin-reader.function';
import 'core-js/features/string';

tnLineStdinReader().subscribe(t => {
    const allGroups = [...t.matchAll(/AP+/g)].map(match => match[0].length - 1).sort((a, b) => b - a);
    const maxLength = allGroups.length ? allGroups[0] : 0;
    console.log(maxLength);
});

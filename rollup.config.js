import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { rmdirSync } from 'fs';
import { sync as globSync } from 'glob';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const base = {
    external: ['readline'],
    plugins: [
        // Allows node_modules resolution
        resolve({ extensions }),

        // Allow bundling cjs modules. Rollup doesn't understand cjs
        commonjs(),

        // Compile TypeScript/JavaScript files
        babel({ extensions, include: ['src/**/*'], babelHelpers: 'bundled' }),
    ],
};
const files = globSync('./src/**/*.main.ts');

rmdirSync('./dist', { recursive: true });

export default files.map((path) => {
    const file = path.replace(/^\.\/src\//g, './dist/').replace(/\.ts$/g, '.js');
    const output = [{ file, format: 'cjs' }];
    return { ...base, input: path, output };
});

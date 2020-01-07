import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
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
        babel({ extensions, include: ['src/**/*'] }),
    ],
};
const files = globSync('./src/practice/**/*.ts');

export default files.map(path => {
    const file = path.replace(/^\.\/src\/practice/g, './dist/practice').replace(/\.ts$/g, '.js');
    const output = [{ file, format: 'cjs' }];
    return { ...base, input: path, output };
});

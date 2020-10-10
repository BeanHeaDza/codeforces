export function readAllStdin() {
    return new Promise((resolve) => {
        let content = '';
        process.stdin.on('data', (d) => (content += d));
        process.stdin.on('close', () => resolve(content));
    });
}

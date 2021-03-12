module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            mono: [
                'monospace',
                'ui-monospace',
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas',
                'Liberation-Mono',
                'Courier-New',
            ],
            body: ['monospace', 'SFMono-Regular', 'Menlo'],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

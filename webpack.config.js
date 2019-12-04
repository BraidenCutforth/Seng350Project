// eslint-disable-next-line
const path = require('path')

module.exports = {
    entry: {
        'create-review': './src/view_scripts/create-review.ts',
        'edit-profile': './src/view_scripts/edit-profile.ts',
    },
    mode: 'production',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/view_scripts'),
    },
}

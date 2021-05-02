const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    target: 'node',
    output: {
        filename: 'blockchain.[hash:6].js',
        path: path.resolve(__dirname, 'build')
    },
    node: {
        global: true,
        __filename: true,
        __dirname: true
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
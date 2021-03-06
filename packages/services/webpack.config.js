const NodemonWebpackPlugin = require('nodemon-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const { argv } = require('yargs');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  mode: argv.develop ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.js'],
  },
  plugins: [new DotenvWebpackPlugin(), new NodemonWebpackPlugin()],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

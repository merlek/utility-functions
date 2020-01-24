const webpack = require('webpack');
const path = require('path');

module.exports = {
   entry: {
      'utility-functions': './src/utility-functions.ts'
   },
   devtool: 'source-map',
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         }
      ],
   },
   resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'utility-functions',
      umdNamedDefine: true
   },
   optimization: {
      minimize:true,
   }
};
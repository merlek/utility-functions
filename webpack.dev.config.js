const webpack = require('webpack');
const path = require('path');

module.exports = {
   entry: {
      'utility-functions': './src/utility-functions.ts'
   },
   devtool: 'inline-source-map',
   mode: 'development',
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
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      hot: true,
   }
};

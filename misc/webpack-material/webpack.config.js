const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
  console.log('argv.mode: ', argv.mode)

  const backend_url = argv.mode === 'production'
    ? 'https://notes2023.fly.dev/api/notes'
    : 'http://localhost:3001/notes'

  return {
    entry: './src/index.js', // the entrypoint for bundling the whole js
    output: {
      path: path.resolve(__dirname, 'build'), // the output directory **absolute path**
      filename: 'main.js' // of the file bundled code
    },
    devServer: {
      static: path.resolve(__dirname, 'build'), // the directory to serve
      compress: true,
      port: 3000
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        },
        {
          test: /\.css$/, // regex test for css files
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}

module.exports = config
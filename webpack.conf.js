import webpack from "webpack";
import path from "path";
const CompressionPlugin = require("compression-webpack-plugin");
const workboxPlugin = require('workbox-webpack-plugin');
let dist = 'dist'
export default {
  module: {
    loaders: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?name=/[hash].[ext]"
      },
      {test: /\.json$/, loader: "json-loader"},
      {
        loader: "babel",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      }
    ]
  },

  plugins: [
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8
  }),
    new webpack.ProvidePlugin({
      "fetch": "imports?this=>global!exports?global.fetch!whatwg-fetch"
    }),
    new workboxPlugin({
      globDirectory: dist,
      globPatterns: ['**/*.{html,js,css,svg,jpg,json,moc,png}'],
      globIgnores: ['admin/*'],
      swDest: path.join(dist, 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
      cleanPlugin: true,
      htmlPlugin: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://aq.khursani.win'),
          handler: 'networkFirst'
        }
      ]
    })
  ],

  context: path.join(__dirname, "src"),
  entry: {
    app: ["./js/app"],
    cms: ["./js/cms"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  externals:  [/^vendor\/.+\.js$/]
};

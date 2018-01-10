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
      },
      {
        test: /\.(jpe?g|png)$/i,
        loaders: [
          // 'file-loader',
          'webp-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      "fetch": "imports?this=>global!exports?global.fetch!whatwg-fetch"
    }),
    new workboxPlugin({
      globDirectory: dist,
      globPatterns: ['**/*.{html,js,css,svg,jpg,json,moc,png}'],
      globIgnores: ['admin/*','sw.js'],
      swDest: path.join(dist, 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
      cleanPlugin: true,
      htmlPlugin: true,
      cacheId: 'khursani',
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://aq.khursani.win'),
          handler: 'networkFirst'
        }
      ]
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html|moc|mtn)$/,
      threshold: 10240,
      minRatio: 0
  }),
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

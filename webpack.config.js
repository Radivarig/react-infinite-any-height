const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    main: __dirname + "/src/InfiniteAnyHeight.jsx",
  },

  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    library: "InfiniteAnyHeight",
    libraryTarget: "umd",
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          }
        ]
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    })
  ],
}

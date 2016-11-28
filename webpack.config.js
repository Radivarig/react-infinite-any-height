module.exports = {
    entry: "./src/entry.jsx",
    output: {
        path: "./",
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
              test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                presets:['react', 'es2015']
              }
            }
        ]
    }
}

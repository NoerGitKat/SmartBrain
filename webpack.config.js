const HTMLWebpackPlugin = require("html-webpack-plugin");

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + "/src/index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: __dirname + "/src/index.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader"
      }
    ]
  },
  output: {
    filename: "transformed.js",
    path: __dirname + "/build"
  },
  devServer: {
    inline: true,
    port: 3000
  },
  plugins: [HTMLWebpackPluginConfig]
};

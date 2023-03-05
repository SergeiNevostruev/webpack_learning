const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const normalizePath = require("normalize-path"); // для винды, без этого не работает удаление

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "template.html"),
      filename: "index.html",
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"].map((it) => normalizePath(path.join(__dirname, it))),
        },
      },
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 9000,
  },
};

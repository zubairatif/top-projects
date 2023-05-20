const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",

  plugins: [
    new HtmlWebpackPlugin({
      title: "Restaurant App",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    filename: "main.js",
    assetModuleFilename: "[name][ext]",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};

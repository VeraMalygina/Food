"use strict";

let path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "./dist/js/bundle.js",
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage",
                },
              ],
            ],
          },
        },
      },
    ],
  },
};

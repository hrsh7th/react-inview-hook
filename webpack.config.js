const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "debug/index.tsx")
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },

  mode: "development",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },

  devServer: {
    port: 8080,
    open: true,
    openPage: "index.html",
    contentBase: path.resolve(__dirname, "debug")
  }
};

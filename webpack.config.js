const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",

    entry: "./js/app.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "img",
                    to: "img"
                }
            ]
        })
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        historyApiFallback: true,
        port: 3000,
        open: true
    },

    devtool: "source-map"
};
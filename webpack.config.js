const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");

const path = require("path");

module.exports = env => {
    return {
        entry: "./bootstrap.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bootstrap.js"
        },
        mode: env.NODE_ENV,
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "app.css"
            }),
            new CopyWebpackPlugin([
                // {from: "template.html", to: "index.html"},
                "index.html",
            ]),
            new CompressionPlugin({
                algorithm: "gzip",
            }),
            new HandlebarsPlugin({
                entry: path.join(process.cwd(), "./index.hbs"),
                output: path.join(process.cwd(), "./", "[name].html"),
                partials: [
                    path.join(process.cwd(), "./resources", "**", "*.hbs")
                ],

                // helpers: {
                //     nameOfHbsHelper: Function.prototype,
                //     projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
                // }
            })
        ],
        module: {
            rules: [
                {
                    test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
    }
}
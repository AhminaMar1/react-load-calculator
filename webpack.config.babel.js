import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"

export default (env, argv) => {
    let mode = argv.mode == "development" ? argv.mode : "production"
    let isDev = mode == "development"

    return {
        entry: "./src/app.tsx",
        output: {
            path: path.join(__dirname, "build"),
            filename: "bundled.js",
        },
        resolve: {
            modules: [
                path.resolve(__dirname, "../node_modules"),
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "node_modules"),
            ],
            extensions: [".ts", ".css", ".js", ".jsx", ".ts", ".tsx"],
        },
        devServer: {
            historyApiFallback: true,
            compress: true,
            port: 5001,
            hot: true,
            inline: true,
            host: "0.0.0.0",
            disableHostCheck: true,
            watchContentBase: true,
            publicPath: "/",
            contentBase: "./build/public",
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
                {
                    test: /\.css/,
                    include: [
                        path.resolve(__dirname, "../node_modules"),
                        path.resolve(__dirname, "src"),
                        path.resolve(__dirname, "node_modules"),
                    ],
                    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
                },
            ],
        },
        optimization: {
            minimizer: [!isDev && new CssMinimizerPlugin()].filter(Boolean),
            minimize: !isDev,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "bundle.css",
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "index.html",
                minify: {
                    collapseWhitespace: !isDev,
                },
            }),
        ],
        devtool: isDev ? "eval-source-map" : undefined,
        mode: mode,
    }
}

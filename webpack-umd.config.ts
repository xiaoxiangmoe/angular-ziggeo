import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
import * as angularExternals from 'webpack-angular-externals';
import * as rxjsExternals from 'webpack-rxjs-externals';

const pkg = JSON.parse(fs.readFileSync('./package.json').toString());

export default {
    entry: {
        'index.umd': './src/ziggeo/index-umd.ts',
        'index.umd.min': './src/ziggeo/index-umd.ts',
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'ticktock'
    },
    resolve: {
        extensions: [ '.ts', '.js', '.json' ]
    },
    externals: [
        angularExternals(),
        rxjsExternals()
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.json'
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ],
                exclude: [
                    /node_modules/,
                    /\.(spec|e2e)\.ts$/
                ]
            },

            {
                test: /\.json$/,
                use: 'json-loader'
            },

            {
                test: /\.css$/,
                use: ['to-string-loader', 'style-loader', 'css-loader']
            },

            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    limit: 10000
                }
            },

            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.join(__dirname, 'src')
        ),

        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            sourceMap: true
        }),

        new webpack.BannerPlugin({
            banner: `
/**
 * ${pkg.name} - ${pkg.description}
 * @version v${pkg.version}
 * @author ${pkg.author.name}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 */
      `.trim(),
            raw: true,
            entryOnly: true
        })

    ]
} as webpack.Configuration;
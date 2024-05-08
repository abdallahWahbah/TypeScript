const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/app.ts', // the root entry file of the project
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // should match the path in the outDir in tsconfig.json
        publicPath: '/dist/'
    },
    devtool: 'inline-source-map',
    module: { // to tell webpack what to do with ts files (compile to js)
        rules: [
            // any ts file it finds, should be handled by ts loader
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: { // what file extensions it adds to the import statements
        extensions: ['.ts', '.js']
    },
    devServer: {
        static: [
          {
            directory: path.join(__dirname),
          },
        ],
    },
};
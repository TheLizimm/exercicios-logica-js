const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 1. Modo
    mode: 'development', // Use 'production' para builds finais

    // 2. Entrada
    entry: './src/index.js',

    // 3. Saída (Output)
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Limpa o diretório 'dist' antes de cada build
        // Define o caminho base público para todos os assets
        publicPath: '/', 
    },

    // 4. Servidor de Desenvolvimento
    devServer: {
        static: './dist', // Serve arquivos a partir do diretório 'dist'
        open: true,       // Abre o navegador automaticamente
        port: 8080,
    },

    // 5. Módulos (Loaders/Rules)
    module: {
        rules: [
            // Regra 5.1: CSS
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },

            // Regra 5.2: Imagens e outros Assets (Webpack 5 - Asset Modules)
            // Lida com PNG, SVG, JPG, JPEG, GIF
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource', // Copia o arquivo para o diretório de output
                generator: {
                    // Define o subdiretório e nome do arquivo no 'dist' (ex: dist/assets/dripping.png)
                    filename: 'assets/[name][ext]', 
                },
            },

            // Regra 5.3: Fontes
            // Lida com WOFF, WOFF2, EOT, TTF
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
            
            // Regra 5.4: Babel (Opcional - Necessita de instalação do @babel/core e @babel/preset-env)
            /*
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            */
        ],
    },

    // 6. Plugins
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Restaurante Dinâmico',
            template: './src/template.html', // Usa seu HTML como template
        }),
    ],

    // 7. Resolução
    // Permite omitir extensões ao importar módulos (ex: import script from './script' em vez de './script.js')
    resolve: {
        extensions: ['.js'],
    },
};
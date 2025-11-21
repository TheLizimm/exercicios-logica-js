// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 1. Ponto de Entrada
  entry: './src/index.js', 

  // 2. Modo (Ideal para desenvolvimento com hot reload)
  mode: 'development', 

  // 3. Output
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, 
  },

  // 4. Loaders (Módulos)
  module: {
    rules: [
      // 🚨 REGRA PARA CSS 
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injeta o CSS no DOM
          'css-loader',   // Transforma o CSS em um módulo JS
        ],
      },
      
      // REGRA PARA Imagens e Assets (opcional, mas bom ter)
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      
      // ⚠️ A REGRA DO BABEL FOI REMOVIDA AQUI!
    ],
  },

  // 5. Plugins
  plugins: [
    // 🚨 PLUG-IN PARA HTML
    new HtmlWebpackPlugin({
      template: './src/template.html', 
      filename: 'index.html',
    }),
  ],

  // 6. Configurações do Servidor de Desenvolvimento
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080, 
    open: true,
    hot: true,
  },
};
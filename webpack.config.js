const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // Режим сборки: 'development' или 'production'
  entry: './src/index.js', // Входная точка нашего приложения
  output: {
    filename: 'bundle.js', // Имя выходного файла
    path: path.resolve(__dirname, 'dist'), // Папка для сборки
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Папка для локального сервера
    port: 8080,
    open: true, // Автоматически открывать браузер
  },
  plugins: [
    new CleanWebpackPlugin(), // Очищает папку dist перед сборкой
    new HtmlWebpackPlugin({
      template: './src/index.html', // Шаблон HTML-файла
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i, // Правило для CSS-файлов
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
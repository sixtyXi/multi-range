const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const isDevelopment = env.development;

  const config = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'none',
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: isDevelopment
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    shippedProposals: true,
                    targets: 'defaults, not IE 11',
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        title: 'Multi-range input demo',
        template: 'src/index.html',
      }),
    ],
    devServer: {
      open: true,
    },
    stats: isDevelopment ? 'minimal' : 'normal',
  };

  return config;
};

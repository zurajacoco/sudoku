# yarnの準備
```
yarn init
```

# reactの準備
reactモジュールのインストール
```
yarn add react react-dom
```

# babelの準備
## babelの必要なパッケージのインストール
```
yarn add --dev babel-core babel-loader babel-preset-env babel-preset-react
```
なお、markdown-editorでは、`babel-core`ではなく`babel-cli`をインストールした（？）

## babelの設定
`.babelrc`を作成して中に記述
ES6用の設定は以下
```
{
  "presets": [
    "env", "react"
  ]
}
```

# webpackの準備
## webpackの必要なパッケージのインストール
```
yarn add --dev webpack webpack-cli
```

## webpackの設定
`webpack.config.js`を作成して中に記述
```
const path = require('path'); // __dirnameを使うため

module.exports = {
  // transpile元
  entry: './src/index.jsx',
  // transpile先のfile_nameとdirectory
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            "cacheDirectory": true,
          }
        },
      }
    ],
  }
};
```
reactなので拡張子は`.jsx`にしている
`cacheDirectory`を有効化すると26%ビルド性能が向上するらしい[2]


# 実行に関して
package.jsonに
```
"scripts": {
  "build": "node_modules/.bin/webpack --display-error-details"
}
```
を追加することで
```
yarn run build
```
で実行可能となる

`--display-error-details`オプションでエラーがもう少し詳しくなる

# githubに関するあれこれ
## branch命名規則
- master
- develop
- feature/#issueNumber_機能名

## commitメッセージ
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug or adds a feature
- perf: A code change that improves performance
- test: Adding missing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
引用元：[3]

# 参考文献
1. [Babelとwebpackを使ってES6でReactを動かすまでのチュートリアル](https://qiita.com/akirakudo/items/77c3cd49e2bf39da79dd)
2. [webpack のビルド性能を95%改善した方法（Boxの事例）](https://sqlazure.jp/r/tips/1550/)
3. [conventional-changelogでGitのログを出力し、リリース時の変更点を確認しよう](https://liginc.co.jp/web/js/164280/2)
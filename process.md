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

markdown-editorでは`HardSourceWebpackPlugin`で高速化しているが、`cacheDirectory`だけでも十分早い

調べると設定に`exclude: /node_modules/`を書いているものが多いが、これを書くとどうなるのかよく理解していないのでここでは書いていない

## 自動ビルドに関して
`webpack-dev-server`を使ってソースコードの変更を検知して自動的にビルドする
```
yarn add --dev webpack-dev-server html-webpack-plugin
```
続いてwebpack.config.jsに追記
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // 中略
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    })
  ]
}
```
`yarn start`で実行できるようにpackage.jsonに追記
```
"scripts": {
  "start": "webpack-dev-server"
},
```

# arrow functionについて
上記設定ではarrow functionはビルド時にsyntax errorになってしまうので、`babel-plugin-transform-class-properties`パッケージを導入する
```
yarn add --dev transform-class-properties
```
.babelrcに以下を追記
```
"plugins": [
    "transform-class-properties"
  ]
```

# eslintの準備
## eslintの必要なパッケージのインストール
```
yarn add --dev eslint eslint-plugin-react babel-eslint eslint-config-google
```

## eslintの設定
eslintが最近version 5になったため、初期化手順が新しくなった。具体的には、ver4では`eslint --init`で有名どころ(google,airbnb)を選択できたが、ver5では`eslint:recommended`とかいうのに自動設定され、たくさんの問いに自分で答えて設定ファイルを生成させるか、既存ファイルを読み込ませてルール抽出させるかになったみたいである。後者は試していないのでどのようになるかは不明。ついでに生成ファイルも、拡張子が`.json`から`.js`に変わった模様。ただ、initせずに`.eslintrc.js`の中身を以下のように、以前の設定ファイルのように設定しても問題はなかった。
```
module.exports = {
    "extends": "google",
    "parser": "babel-eslint",
    "plugins": [
      "react"
    ],
    "rules": {
      "require-jsdoc": 0,
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error"
    }
};
```
これを有効にするために`babel-eslint`と`eslint-config-google`を導入する。

このままだとarrow function中の`this`に毎回エラーが出るので、気になるならば`yarn add --dev eslint-plugin-babel`をし、`.eslintrc.js`に以下を追記すれば良い。
```
"plugins": [
  "babel"
],
"rules": {
  "no-invalid-this": 0,
  "babel/no-invalid-this": 1
}
```
ただの`no-invalid-this`の無効化だけだとarrow function以外のまずい`this`も無効化してしまう可能性がある。

## eslintの実行
```
yarn run eslint [file] (--fix)
```
ver5になってからフォルダ名指定だけではエラーが出るようになった。厳密にファイルを指定しないとダメなように変更されたらしい。

詳しい変更点は[こちら](https://eslint.org/docs/user-guide/migrating-to-5.0.0)

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
4. [Babel, webpack, flow & eslintを使ってReactの開発環境を構築する](https://qiita.com/shoichiimamura/items/d6e53aec310cc4d669d0)
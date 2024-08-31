# Automatic Login V2

[automatic_login](https://github.com/ogreverse/automatic_login) の後継版。
Selenium から PlayWright を使うように変更しました。

[zennの記事](https://zenn.dev/ogreverse/articles/73697932efd128)

## 用途

複数アカウントへ同時ログインしたいサービス(例えばawsやgithub)に簡単にログインするスクリプト。

## 対応サービス

- AWS

## 注意事項

- Macで使われることを想定してます。
- MFAデバイスやシークレットキーのバックアップはご自身の責任で行ってください。

## セットアップ

```
$ sh setup.sh
```

## コマンド

- `$ npm run otp -- {シークレットキーの環境変数キー}`
  - 2FAに必要なワンタイムパスワードを生成する。
  - 例) `$ npm run otp -- AWS_FOO_SECRET`
- `$ npm run otp:watch -- {シークレットキーの環境変数キー}`
  - 2FAに必要なワンタイムパスワードを1秒おきに生成する。
  - 例) `$ npm run otp:watch -- AWS_FOO_SECRET`
- `$ npm run aws -- {アカウント名}`
  - AWSにログインする。
  - 例) `$ npm run aws -- FOO`

---

## 使い方

### ファイルコピーと編集

- mac_commands以下のファイルを任意のディレクトリにコピーする。
- login_sample.commandのファイル名を任意のAWSアカウント名に変える。<br>
  e.g. login_foo.command
- login_foo.command内の"FOO"の部分を任意のAWSアカウント名に変える。<br>

```
(e.g.)
cd `dirname $0`
./login_aws.js FOO
exit
```

### アカウント情報の設定

シェル起動時の設定ファイル( `~/.bashrc` や `~/.zshrc` など)に、<br>
以下のように起動時にAWSアカウント情報を環境変数として設定するようにする。<br>
(FOOは任意のアカウント名に置き換える)

```
export AWS_FOO_ACCOUNT="1234567891234"
export AWS_FOO_USERNAME="user_no_namae"
export AWS_FOO_PASSWORD="PaSSworD"
```

### シークレットキーの登録

2FAのワンタイムパスワードを生成するために、利用するサービスで発行されるシークレットキーを取得し、環境変数として設定する。

```
export AWS_FOO_SECRET="XXXXXXXXXXXXXXXXXXXX"
```

環境変数設定後、利用するサービス側で登録するワンタイムトークンを生成する。

`$ npm run otp:watch -- AWS_FOO_SECRET`

### 実行

login_foo.command を実行。(もしくは spotlight で "login_foo.command" を実行)

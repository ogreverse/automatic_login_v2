# Automatic Login V2

[automatic_login](https://github.com/ogreverse/automatic_login) の後継版。
Selenium から PlayWright を使うように変更しました。

## 用途

複数アカウントへ同時ログインしたいサービス(例えばawsやgithub)に簡単にログインするスクリプト。

## 注意事項

- Macで使われることを想定してます。

# セットアップ

下記のコマンドをプロジェクトルートディレクトリで実行する。

```
$ sh setup.sh
```

---

## 使い方 (awsログインの場合)

### ファイルコピーと編集

- aws以下のファイルを任意のディレクトリにコピーする。
- login_sample.commandのファイル名を任意のAWSアカウント名に変える。<br>
  e.g. login_foo.command
- login_foo.command内の"FOO"の部分を任意のAWSアカウント名に変える。<br>

```
(e.g.)
cd `dirname $0`
./login_aws.js FOO
exit
```

### 環境変数定義

シェル起動時の設定ファイル( `~/.bashrc` や `~/.zshrc` など)に、<br>
以下のように起動時にAWSアカウント情報を環境変数として設定するようにする。<br>
(FOOは任意のアカウント名に置き換える)

```
export AWS_FOO_ACCOUNT="1234567891234"
export AWS_FOO_USERNAME="user_no_namae"
export AWS_FOO_PASSWORD="PaSSworD"
```

### 実行

login_foo.commandを実行(もしくはspotlightで "login_foo.command" を実行)

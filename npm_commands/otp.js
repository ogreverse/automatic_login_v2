const { generateOtp } = require('../helpers/generate_otp.js');

const dotenv = require('dotenv');
dotenv.config();

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('シークレットキーを登録している環境変数のキーを指定してください。');
  console.log('npm run otp -- {シークレットキー環境変数キー}');
  console.log('e.g.) npm run otp -- AWS_FOO_SECRET');
  process.exit(1);
}

try {
  const envKey = args[0];
  const secret = process.env[`${envKey}`];

  const ret = generateOtp(secret)
  console.log(`ワンタイムパスワード: ${ret.token}`)
  console.log(`更新まで ${ret.timeRemaining} 秒`)
} catch (error) {
  console.error(error.message)
}
require('dotenv').config();
const { authenticator } = require('otplib');

authenticator.options = {
  step: 30,
  window: 1,
  digits: 6,
  algorithm: 'sha1'
};

function generateOtp(secret) {
  if (!secret) {
    console.error('ワンタイムパスワードを生成するためのシークレットキーが不正です。');
    process.exit(1);
  }

  const token = authenticator.generate(secret);
  const timeRemaining = authenticator.timeRemaining();
  return { token, timeRemaining };
}

module.exports = { generateOtp };
const { webkit } = require('playwright');
const { generateOtp } = require('../helpers/generate_otp.js');
const dotenv = require('dotenv');
dotenv.config();

const args = process.argv.slice(2);
const accountAlias = args[0];
const account = process.env[`AWS_${accountAlias}_ACCOUNT`];
const username = process.env[`AWS_${accountAlias}_USERNAME`];
const password = process.env[`AWS_${accountAlias}_PASSWORD`];
const secret = process.env[`AWS_${accountAlias}_SECRET`];
const timeoutSec = 15000;

(async () => {
  // memo: chromium を使うと特定のページにアクセスした際にクラッシュするため、webkit を使用
  const browser = await webkit.launch({
    headless: false,
    args: [
      '--single-process', // memo: ブラウザ終了時にプロセスを残さない
    ],
  });
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  await page.goto(`https://${account}.signin.aws.amazon.com/console`);

  // フィールドが全て表示されるまで待機
  await page.waitForSelector('#username', { timeout: timeoutSec });
  await page.waitForSelector('#password', { timeout: timeoutSec });
  await page.waitForSelector('#signin_button', { timeout: timeoutSec });

  // memo: 上記の waitForSelector だけだと、フィールドが表示された後に入力ができる前に処理が進んでしまうため、適当な時間待機
  await page.waitForTimeout(500);

  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('#signin_button');

  await page.waitForSelector('#mfaCode', { timeout: timeoutSec });
  const { token } = generateOtp(secret);
  await page.fill('#mfaCode', token);
  await page.click('button[type="submit"]');
})();

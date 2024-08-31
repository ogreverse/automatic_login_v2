const { chromium } = require('playwright');
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
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`https://${account}.signin.aws.amazon.com/console`);

  // ユーザー名フィールドが表示されるまで待機
  await page.waitForSelector('#username', { timeout: timeoutSec });
  await page.fill('#username', username);

  // パスワードフィールドが表示されるまで待機
  await page.waitForSelector('#password', { timeout: timeoutSec });
  await page.fill('#password', password);

  // サインインボタンが表示されるまで待機
  await page.waitForSelector('#signin_button', { timeout: timeoutSec });
  await page.click('#signin_button');

  await page.waitForSelector('#mfaCode', { timeout: timeoutSec });
  const { token } = generateOtp(secret);
  await page.fill('#mfaCode', token);
  await page.click('button[type="submit"]');
})();
const { chromium } = require('playwright');
const dotenv = require('dotenv');
dotenv.config();

const args = process.argv.slice(2);
const account = process.env[`AWS_${args[0]}_ACCOUNT`];
const username = process.env[`AWS_${args[0]}_USERNAME`];
const password = process.env[`AWS_${args[0]}_PASSWORD`];
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

  await page.setViewportSize({ width: 1920, height: 1080 });
})();
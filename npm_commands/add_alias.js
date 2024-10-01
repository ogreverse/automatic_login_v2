const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('エイリアスを入力してください（入力例：FOO）', (alias) => {
  console.log(`入力されたエイリアス: ${alias}`);
  rl.close();
});
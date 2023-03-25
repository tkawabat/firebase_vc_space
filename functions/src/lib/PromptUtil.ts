import * as readline from 'readline';

/**
 * ユーザーに値を入力させる
 */
export async function prompt(msg: string): Promise<string> {
  console.log(msg);
  const answer = await question('> ');
  return answer.trim();
}

/**
 * 標準入力を取得する
 */
function question(question: string): Promise<string> {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise<string>((resolve) => {
    readlineInterface.question(question, (answer) => {
      resolve(answer);
      readlineInterface.close();
    });
  });
}

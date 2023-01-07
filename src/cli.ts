import { initializeApp, cert } from 'firebase-admin/app';
import { Command, OptionValues } from 'commander';

import { ServiceAccount } from './lib/Const';
import { prompt } from './lib/PromptUtil';

import UserModel from "./model/UserModel";
import RoomModel from "./model/RoomModel";


async function initFirestore(options: OptionValues) {
  if (!Object.keys(ServiceAccount).includes(options.env)) {
    console.log('env is invalid.');
    process.exit(1);
  }
  const env: string = options.env as string;

  console.log('env: ' + env);

  if (env == 'prod') {
    while(1) {
        const answer = await prompt('本番環境です。実行してよいですか？Y/n');
        if (answer == 'n') {
            console.log('中断します。');
            process.exit(0);
        }
        if (answer == 'Y') {
            break;
        }
    }
  }

  initializeApp({
    credential: cert(ServiceAccount[env])
  });
}

async function handleOptions(options: OptionValues) {
    await initFirestore(options);
}

function execPromise(promise: Promise<void>) {
    promise.then(() => console.log('Command has completed!')).catch(console.error)
}

const program = new Command();

program.version('1.0.0', '-v, --version');
program
    .option('--env <env>', 'environment', 'dev')
    ;

program
    .command('user')
    .option('-d, --delete', 'delete only the created documents')
    .option('-n, --number <n>', 'A number of test documents', parseInt, 0)
    .description('create test user documents')
    .action(async cmd => {
        await handleOptions(program.opts());
        const model = new UserModel();

        if (cmd.number > 10000) {
            console.error('The number must be 10000 or less');
            process.exit(-1);
        }
        const promise = cmd.delete ? model.batchDeleteAll() : model.setBatch(cmd.number)
        execPromise(promise);
    });
program
    .command('room')
    .option('-d, --delete', 'delete only the created documents')
    .option('-n, --number <n>', 'A number of test documents', parseInt, 0)
    .description('create test room documents')
    .action(async cmd => {
        await handleOptions(program.opts());
        const model = new RoomModel();

        if (cmd.number > 10000) {
            console.error('The number must be 10000 or less');
            process.exit(-1);
        }
        const promise = cmd.delete ? model.batchDeleteAll() : model.addBatch(cmd.number)
        execPromise(promise);
    });
program.parse(process.argv);

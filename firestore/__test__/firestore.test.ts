import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';
import * as testing from '@firebase/rules-unit-testing';
const { setLogLevel } = require('firebase/firestore')

const projectID = v4();
let testEnv :testing.RulesTestEnvironment;

beforeAll(async () => {
  setLogLevel('error')
  const ruleFile = path.resolve(__dirname, '../firestore.rules')

  testEnv = await testing.initializeTestEnvironment({
    projectId: projectID,
    firestore: {
      rules: fs.readFileSync(ruleFile, 'utf8'),
      port: 8080,
      host: '127.0.0.1'
    }
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

afterAll(async () => {
  await testEnv.cleanup();
});

export const getDB = () => {
  const uid = v4()
  const authenticatedContext = testEnv.authenticatedContext(uid)
  const clientDB = authenticatedContext.firestore()

  const unauthenticatedContext = testEnv.unauthenticatedContext()
  const guestClientDB = unauthenticatedContext.firestore()
  return { uid, clientDB, guestClientDB }
}

test('sample', () => {
  expect(1).toEqual(1)
})
import * as functions from 'firebase-functions';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import PushService from './service/PushService';

initializeApp({ credential: credential.applicationDefault() });

export const sendPush = functions
  .region('asia-northeast1')
  .runWith({ timeoutSeconds: 300 })
  // for local develop
  // .https.onRequest(async (request, response) => {
  .pubsub.schedule('every 2 minutes')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const pushService = new PushService();
    await pushService.sendPush();

    // for local develop
    // response.send('Hello from Firebase!');
    return true;
  });

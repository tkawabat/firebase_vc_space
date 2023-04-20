import * as functions from 'firebase-functions';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import PushService from './service/PushService';
import { defineString } from 'firebase-functions/params';

initializeApp({ credential: credential.applicationDefault() });

const pushService = new PushService();

export const sendPush = functions
  .region('asia-northeast1')
  .runWith({ timeoutSeconds: 300 })
  // for local develop
  // .https.onRequest(async (request, response) => {
  .pubsub.schedule('every 2 minutes')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    pushService.setSupabase(
      defineString('SUPABASE_URL').value(),
      defineString('SUPABASE_SECRET_KEY').value()
    );
    await pushService.sendPush();

    // for local develop
    // response.send('Hello from Firebase!');
    return true;
  });

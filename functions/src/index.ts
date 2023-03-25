import * as functions from 'firebase-functions';

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const sendPush = functions.https.onRequest((request, response) => {
  
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('ああああああああHello from Firebase!');
});

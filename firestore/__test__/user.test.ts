import * as testing from '@firebase/rules-unit-testing';
import * as firestore from 'firebase/firestore';
import { v4 } from 'uuid';

import { getDB } from './firestore.test';

const collection = 'User'

describe(collection + ' collection', () => {
  describe('read', () => {
    it('success 未承認', async () => {
      const { guestClientDB } = getDB();    
      const uid = v4();

      const docRef = guestClientDB.doc(collection + '/' + uid);
      await testing.assertSucceeds(firestore.getDoc(docRef));
    });
  });

  describe('write', () => {
    it('fail 未承認', async () => {
      const { guestClientDB } = getDB();
      const uid = v4();

      const docRef = firestore.doc(guestClientDB, collection, uid);
      await testing.assertFails(firestore.setDoc(docRef, {}));
    });

    it('fail uidが違う', async () => {
      const { clientDB } = getDB();
      const anotherId = v4();

      const docRef = firestore.doc(clientDB, collection, anotherId);
      await testing.assertFails(firestore.setDoc(docRef, {}));
    });

    it('success uid一致', async () => {
      const { uid, clientDB } = getDB();

      const docRef = firestore.doc(clientDB, collection, uid);
      await testing.assertSucceeds(firestore.setDoc(docRef, {}));
    });
  });
});

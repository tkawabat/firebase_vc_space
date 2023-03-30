import { getFirestore } from 'firebase-admin/firestore';

import * as C from '../lib/Const';
import * as ArrayUtil from '../lib/ArrayUtil';

export default class ModelBase {
  protected firestore: FirebaseFirestore.Firestore;

  private _batchSize = C.DefaultBatchSize;
  get batchSize() {
    return this._batchSize;
  }
  set batchSize(size) {
    this._batchSize = size;
  }

  private _ref: FirebaseFirestore.CollectionReference;
  get ref() {
    return this._ref;
  }
  set ref(ref) {
    this._ref = ref;
  }

  constructor(collection: string) {
    this.firestore = getFirestore();
    this._ref = this.firestore.collection(collection);
  }

  protected commit = async (batch: FirebaseFirestore.WriteBatch) => {
    await batch.commit();
  };

  protected asyncBatch = async (type: C.BatchType, data: Array<object>) => {
    let batch = this.firestore.batch();

    const g = ArrayUtil.batchGenerator(data, this.batchSize);
    let current = g.next();
    while (!current.done) {
      if (!current.value) continue;
      switch (type) {
        case C.BatchType.Create:
          current.value.forEach((v) => batch.set(this._ref.doc(), v.data));
          break;
        case C.BatchType.CreateWithId:
          current.value.forEach((v) => batch.set(this._ref.doc(v.id), v.data));
          break;
        case C.BatchType.Set:
          // TODO
          console.error('not implemented');
          process.exit(-1);
          break;
        case C.BatchType.Update:
          current.value.forEach((v) =>
            batch.update(this._ref.doc(v.id), v.data)
          );
          break;
        case C.BatchType.Delete:
          // TODO
          console.error('not implemented');
          process.exit(-1);
          break;
      }

      await this.commit(batch);
      batch = this.firestore.batch();
      current = g.next();
    }
  };

  public asyncGetById = async (id: string) => {
    return this.ref.doc(id).get();
  };

  public asyncDeleteById = async (id: string) => {
    return this._ref.doc(id).delete();
  };

  public batchDeleteAll = async () => {
    // モックデータのみを500件ずつ取得
    const query = await this._ref.limit(this.batchSize);
    // 再帰関数
    const executeBatch = async () => {
      const snapshot = await query.get();
      if (snapshot.size === 0) {
        return;
      }
      const batch = this.firestore.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      await executeBatch();
    };
    await executeBatch();
  };
}

import * as admin from 'firebase-admin';
import { DocumentData } from '@google-cloud/firestore';

import ModelBase from './ModelBase';
import * as C from '../lib/Const';
import * as ArrayUtil from '../lib/ArrayUtil';


export interface User extends DocumentData {
    id: string,
    name: string
    photo: string
    tags: Array<string>
    twitterId: string
    blocks: Array<string>
    updatedAt: FirebaseFirestore.Timestamp
}

export function createUser(i: number): User {
    const photo = ArrayUtil.getRandom([
        'https://pbs.twimg.com/profile_images/448301181324894208/vqY_gIaL.jpeg',
        'https://pbs.twimg.com/profile_images/1201897412610031616/p3lYSGtp.jpg',
        'https://pbs.twimg.com/profile_images/979349742563053569/r5wHiGBH.jpg',
        'https://pbs.twimg.com/profile_images/1248273712/Upload.jpg',
    ]);

    const id = 'test_' + i;
    const user: User = {
        id: id,
        name: id,
        photo: photo,
        tags: [],
        twitterId: id,
        blocks: [],
        updatedAt: admin.firestore.Timestamp.now(),
    }
    return user;
}

export default class UserModel extends ModelBase {
    constructor() {
        super('User');
    }
    
    public setBatch = async (n: number) => {
        if (n >= 1000) {
            console.error('too many.');
            return;
        }

        const batch: Array<any> = [];
        for (let i = 0; i < n; i++) {
            const user: User = createUser(i);
            batch.push({id: user.id, data:user})
        }

        await this.asyncBatch(C.BatchType.CreateWithId, batch);
    }
}
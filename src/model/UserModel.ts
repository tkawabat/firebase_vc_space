import * as admin from 'firebase-admin';
import { DocumentData } from '@google-cloud/firestore';

import ModelBase from './ModelBase';
import * as C from '../lib/Const';
import * as ArrayUtil from '../lib/ArrayUtil';
import * as RandomUtil from '../lib/RandomUtil';


export interface User extends DocumentData {
    name: string
    photo: string
    greeting: string
    tags: Array<string>
    twitterId: string
    blocks: Array<string>
    times: Array<FirebaseFirestore.Timestamp>
    updatedAt: FirebaseFirestore.Timestamp
}

export function createUser(id: string): User {
    const photo = ArrayUtil.getRandom([
        'https://pbs.twimg.com/profile_images/448301181324894208/vqY_gIaL.jpeg',
        'https://pbs.twimg.com/profile_images/1201897412610031616/p3lYSGtp.jpg',
        'https://pbs.twimg.com/profile_images/979349742563053569/r5wHiGBH.jpg',
        'https://pbs.twimg.com/profile_images/1248273712/Upload.jpg',
    ]);

    const user: User = {
        name: id,
        photo: photo,
        greeting: RandomUtil.getRandomLengthText(C.MaxGreeting),
        tags: [],
        twitterId: id,
        blocks: [],
        times: [],
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
            const id = 'test_' + i;
            const user: User = createUser(id);
            batch.push({id: id, data:user})
        }

        await this.asyncBatch(C.BatchType.CreateWithId, batch);
    }
}
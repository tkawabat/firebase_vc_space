import * as admin from 'firebase-admin';
import { DocumentData } from '@google-cloud/firestore';

import ModelBase from './ModelBase';
import * as C from '../lib/Const';
import * as ArrayUtil from '../lib/ArrayUtil';
import { createUser } from './UserModel';


export interface Room extends DocumentData {
    ownerId: string
    ownerImage: string
    title: string
    description: string | null
    place: C.PlaceType
    placeUrl: 'https://hogehoge',
    startTime: FirebaseFirestore.Timestamp,
    tags: Array<string>
    maxNumber: number
    enterType: C.EnterType
    pass: string | null
    users: Array<string>
    updatedAt: FirebaseFirestore.Timestamp
}

export function createRoom(i: number): Room {
    const placeType = ArrayUtil.getRandom(Object.keys(C.PlaceType)) as C.PlaceType;
    const enterType = ArrayUtil.getRandom(Object.keys(C.EnterType)) as C.EnterType;
    const owner = createUser(i);

    const room: Room = {
        ownerId: owner.id,
        ownerImage: owner.photo,
        title: 'test_room_'+i,
        description: ArrayUtil.getRandom([null, 'xxxxx']),
        place: C.PlaceType[placeType],
        placeUrl: 'https://hogehoge',
        startTime: admin.firestore.Timestamp.now(),
        tags: [],
        maxNumber: 2 + Math.floor(Math.random() * 10),
        enterType: C.EnterType[enterType],
        pass: 'pass',
        users: [],
        updatedAt: admin.firestore.Timestamp.now()
    }
    return room;
}

export default class RoomModel extends ModelBase {
    constructor() {
        super('Room');
    }
    
    public addBatch = async (n: number) => {
        if (n >= 1000) {
            console.error('too many.');
            return;
        }

        const batch: Array<any> = [];
        for (let i = 0; i < n; i++) {
            const room: Room = createRoom(i);
            batch.push({id: null, data:room})
        }

        await this.asyncBatch(C.BatchType.Create, batch);
    }
}
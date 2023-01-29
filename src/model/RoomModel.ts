import * as admin from 'firebase-admin';
import { DocumentData } from '@google-cloud/firestore';

import ModelBase from './ModelBase';
import * as C from '../lib/Const';
import * as ArrayUtil from '../lib/ArrayUtil';
import * as RandomUtil from '../lib/RandomUtil';
import { createUser } from './UserModel';


export interface RoomUser extends DocumentData {
    id: string,
    image: string,
    roomUserType: C.RoomUserType,
}

export interface Chat extends DocumentData {
    userId: string,
    name: string,
    photo: string,
    text: string,
    updatedAt: FirebaseFirestore.Timestamp,
}

export interface Room extends DocumentData {
    title: string
    description: string
    place: C.PlaceType
    placeUrl: 'https://hogehoge',
    startTime: FirebaseFirestore.Timestamp,
    tags: Array<string>
    maxNumber: number
    enterType: C.EnterType
    password: string | null
    users: Array<RoomUser>
    chats: Array<Chat>
    updatedAt: FirebaseFirestore.Timestamp
}

export function createRoom(i: number): Room {
    const placeType = ArrayUtil.getRandom(Object.keys(C.PlaceType)) as C.PlaceType;
    const enterType = ArrayUtil.getRandom(Object.keys(C.EnterType)) as C.EnterType;
    const owner = createUser("test_" + i);

    const roomUser: RoomUser = {
        id: "test_" + i,
        image: owner.photo,
        roomUserType: C.RoomUserType.admin,
        updatedAt: admin.firestore.Timestamp.now(),
    } 

    const room: Room = {
        title: 'test_room_'+i,
        description: RandomUtil.getRandomLengthText(C.MaxRoomDescription),
        place: C.PlaceType[placeType],
        placeUrl: 'https://hogehoge',
        startTime: admin.firestore.Timestamp.now(),
        tags: [],
        maxNumber: 2 + Math.floor(Math.random() * 10),
        enterType: C.EnterType[enterType],
        password: 'pass',
        users: [roomUser],
        chats: [],
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
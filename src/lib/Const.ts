interface ConstObject {
    [key: string]: any
}

export const DefaultBatchSize = 500;
export enum BatchType {
    Create,
    CreateWithId,
    Set,
    Update,
    Delete
}

export const ServiceAccount: ConstObject = {
'dev': require('../../sec/vc-space-dev-firebase-adminsdk-unymx-e000b1c6a5.json'),
'prod': require('../../sec/vc-space-firebase-adminsdk-iua1h-63050e4a34.json'),
}

export enum PlaceType {
    discord = 'discord',
    twicasting = 'twicasting',
    twitter = 'twitter',
    spoon = 'spoon',
    none = 'none',
}

export enum EnterType {
    noLimit = 'noLimit',
    follow = 'follow',
    password = 'password',
}
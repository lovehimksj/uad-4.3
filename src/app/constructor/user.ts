import {Status} from '../enum/status';

export class User {
    id: number;
    username: string;
    fullName: string;
    bio: string;
    email: string;
    isPrivate: boolean;
    isActive: boolean;
    pictureUri: string;
    outgoingStatus: Status;
    incommingStatus: Status;
    posts: number;
    followers: number;
    following: number;
}

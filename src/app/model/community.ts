import {User} from './user';

export class Community {
    communityId: string;
    communityName: string;
    communityCreatedDate: Date;
    communityCreatedBy: User;
    communityUsers: User;
}
import {User} from './user';

export class Message {
    id: string;
    messageContent: string;
    sender: User;
    receiver: User;
    createdAt: Date;


    constructor(messageContent: string, sender: User, receiver: User) {
        this.messageContent = messageContent;
        this.sender = sender;
        this.receiver = receiver;
    }
}
import {User} from './user';

export class Message {
    id: string;
    messageContent: string;
    sender: User;
    receiver: User;
    timestamp: Date;

    constructor(messageContent: string, sender: User, receiver: User) {
        this.messageContent = messageContent;
        this.sender = sender;
        this.receiver = receiver;
    }
}
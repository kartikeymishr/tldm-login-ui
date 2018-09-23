import {User} from './user';
import {Channel} from './channel';

export class ChannelMessage {
    message_id: string;
    message_text: string;
    sender: User;
    channel: Channel;
    sentDate: Date;

    constructor(message_text: string, sender: User, channel: Channel) {
        this.message_text = message_text;
        this.sender = sender;
        this.channel = channel;
    }
}
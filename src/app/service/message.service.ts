import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Message} from '../model/message';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';


@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private serverUrl = 'http://172.23.239.122:8067/web-socket';
    private stompClient = null;
    messagesArr: Message[] = [];
    messages: Message[] = [];

    sender: User;
    receiver: User;

    constructor(private http: HttpClient) {
    }

    establishConnection(userId: string) {
        const socket = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(socket);
        const that = this;
        this.stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            that.stompClient.subscribe(`/topic/response/${userId}`, function (message) {
                that.showGreeting(JSON.parse(message.body));
            });
        });
    }

    getAllMessagesBySenderAndReceiver(): Observable<Message[]> {
        console.log('from message service');
        console.log(this.receiver);
        return this.http.get<Message[]>(`http://172.23.239.104:8068/api/v1/message/${this.sender.userId}/${this.receiver.userId}`);
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log('Disconnected');
    }

    showGreeting(message) {
        this.messagesArr.push(message);
    }

    getSender(): User {
        return this.sender;
    }

    setSender(sender: User) {
        this.sender = sender;
    }

    getReceiver(): User {
        return this.receiver;
    }

    setReceiver(receiver: User) {
        this.receiver = receiver;
    }

    sendMessage(message: Message) {
        console.log('form message service');
        console.log(message);
        this.stompClient.send('/app/chat', {}, JSON.stringify(message));
    }

    setMessages(messages: Message[]) {
        this.messages = [];
        this.messagesArr = [];
        messages.sort((message1, message2) => {
            if (message1.timestamp < message2.timestamp) {
                return -1;
            } else if (message1.timestamp > message2.timestamp) {
                return 1;
            } else {
                return 0;
            }
        });

        this.messages = messages;
    }
}

import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Message} from '../model/message';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Notification} from '../model/notification';
import {DisplayMessage} from '../model/display-message';


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

    notification = new Notification(false, 'userId');
    displayMessage = new DisplayMessage(false, 'userId');

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
        this.notification = new Notification(true, message.sender.userId);
        console.log(this.notification);
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
        this.clearMessages();

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

    clearMessages() {
        this.messages = [];
        this.messagesArr = [];
    }

    resetNotification() {
        this.notification.isActive = false;
    }

    setDisplayMessage(userId: string) {
        this.displayMessage = new DisplayMessage(true, userId);
    }
}

import {Component, OnInit} from '@angular/core';
import {Message} from '../model/message';
import {MessageService} from '../service/message.service';

@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

    value = '';

    message: Message;

    constructor(private messageService: MessageService) {
    }

    ngOnInit() {
    }

    sendMessage(messageContent: string) {
        this.value = '';
        if (messageContent !== '') {
            this.message = new Message(messageContent, this.messageService.getSender(), this.messageService.getReceiver());
            this.messageService.sendMessage(this.message);
        }
    }
}

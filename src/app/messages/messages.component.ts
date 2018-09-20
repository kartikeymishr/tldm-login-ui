import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {Message} from '../message';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    messages: Message[];

    constructor(public messageService: MessageService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.messageService.getAllMessagesBySenderAndReceiver(this.route.snapshot.paramMap.get('id')).subscribe(data => {
            this.messages = data;
        });
    }
}

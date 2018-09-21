import {Component, OnInit} from '@angular/core';
import {MessageService} from '../service/message.service';
import {Message} from '../model/message';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    // messages: Message[];

    constructor(public messageService: MessageService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
    }
}

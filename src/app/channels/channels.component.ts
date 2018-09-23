import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ChannelService} from '../service/channel.service';
import {Channel} from '../model/channel';
import {MessageService} from '../service/message.service';

@Component({
    selector: 'app-channels',
    templateUrl: './channels.component.html',
    styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

    channels: Channel[];

    constructor(private router: Router,
                private channelService: ChannelService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.channelService.getAllChannels().subscribe(data => {
            console.log(this.channels = data);
            this.messageService.establishConnectionForChannel(this.channels);
        });
    }

    createChannel() {
        this.router.navigateByUrl('/create-channel');
    }
}

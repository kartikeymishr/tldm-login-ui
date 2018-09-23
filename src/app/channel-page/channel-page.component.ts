import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {Channel} from '../model/channel';
import {Router} from '@angular/router';
import {ChannelService} from '../service/channel.service';
import {CommunityService} from '../service/community.service';

@Component({
    selector: 'app-channel-page',
    templateUrl: './channel-page.component.html',
    styleUrls: ['./channel-page.component.css']
})
export class ChannelPageComponent implements OnInit {

    channel: Channel;
    users: User[];
    channelUsers: User[] = [];

    constructor(private channelService: ChannelService,
                private communityService: CommunityService,
                private router: Router) {
    }

    ngOnInit() {
        this.communityService.getAllCommunityUsers().subscribe((data: User[]) => {
            this.users = data;
        });
    }

    create(channelName: string, channelDescription: string) {
        this.channel = new Channel(channelName, channelDescription, this.channelUsers);
        this.channelService.createChannel(this.channel).subscribe(data => {
            console.log('created ' + data.channelName + ' successfully');
            console.log(data);
        });
        this.router.navigateByUrl('/dashboard');
    }

    addUsers(user: User) {
        this.channelUsers.push(user);
    }
}

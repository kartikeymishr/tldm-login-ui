import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {Message} from '../model/message';
import {UserService} from '../service/user.service';
import {MessageService} from '../service/message.service';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

    users: User[];
    user: User;
    messages: Message[];

    constructor(private userService: UserService,
                public messageService: MessageService) {
    }

    ngOnInit() {
        // fetching all users on component initialization
        this.userService.getAllUsers().subscribe((data: User[]) => {
            console.log(this.users = data);
        });
    }

    // setting sender value for front-end
    setSender(userId: string) {
        this.userService.getUserDetailsById(userId).subscribe(data => {
            console.log(this.user = data);
            this.messageService.setSender(this.user);
        });
    }

    // setting receiver value for front-end
    setReceiver(userId: string) {
        this.messageService.resetNotification();
        this.userService.getUserDetailsById(userId).subscribe(data => {
            console.log(this.user = data);
            this.messageService.setReceiver(this.user);
            this.messageService.getAllMessagesBySenderAndReceiver().subscribe(messages => {
                console.log(this.messages = messages);
                this.messageService.setMessages(this.messages);
            });
        });
    }
}

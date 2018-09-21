import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {MessageService} from '../service/message.service';
import {Message} from '../model/message';

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
                private messageService: MessageService) {
    }

    ngOnInit() {
        // fetching all users on component initialization
        this.userService.getAllUsers().subscribe((data: User[]) => {
            this.users = data;
        });
    }

    // setting receiver value for front-end
    setReceiver(userId: string) {
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

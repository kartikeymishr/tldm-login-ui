import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from '../service/message.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    opened: boolean;

    constructor(private router: Router,
                private messageService: MessageService) {
    }

    ngOnInit() {
    }

    logout() {
        this.messageService.clearMessages();
        this.router.navigateByUrl('/login');
        this.messageService.disconnect();
    }

}

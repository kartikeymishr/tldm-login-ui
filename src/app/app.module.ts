import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarComponentComponent} from './sidebar-component/sidebar-component.component';
import {ChannelsComponent} from './channels/channels.component';
import {PeopleComponent} from './people/people.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MainComponentComponent} from './main-component/main-component.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatListModule, MatCardModule} from '@angular/material';
import {MatCheckboxModule, MatTooltipModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MessagesComponent} from './messages/messages.component';
import {ChatInputComponent} from './chat-input/chat-input.component';
import {MatInputModule} from '@angular/material/input';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './/app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        AppComponent,
        MainComponentComponent,
        SidebarComponentComponent,
        ChannelsComponent,
        PeopleComponent,
        MessagesComponent,
        ChatInputComponent,
        ToolbarComponent,
        DashboardComponent,
        RegisterComponent,
        LoginComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatMenuModule,
        MatInputModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatSnackBarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

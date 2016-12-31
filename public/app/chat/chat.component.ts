import { ChatPopupComponent } from './chat-popup/chat-popup.component';
import { ObservableInput } from 'rxjs/Observable';
import { locale, months } from 'moment';
import { Subscriber } from 'rxjs/Rx';
import { User } from '../models/user-model';
import { ChatService } from '../services/chat-service';
import { Component, ViewChild, OnInit } from '@angular/core';
declare var $: JQueryStatic;

@Component({
    selector: 'chat',
    templateUrl: 'app/chat/chat.component.html',
    providers: [
        ChatPopupComponent
    ]
})
export class ChatComponent implements OnInit {
    onlineUsers: User[];

    currentUsername: string;

    showPopup: boolean;

    constructor(private chatService: ChatService, @ViewChild(ChatPopupComponent) private popup: ChatPopupComponent) {
        this.showPopup = false;
    }

    ngOnInit() {
        if (localStorage.getItem('currentUser') != undefined) {
            const localStorageUser = JSON.parse(localStorage.getItem('currentUser'));
            this.currentUsername = localStorageUser.username;
            this.chatService.onlineUsers.subscribe(x => this.onlineUsers = x.onlineUsers);
            this.chatService.connectUser();
        }
    }

    registerPopup(username: string) {
        this.showPopup = true;
        $('chat-box').css('display', 'block');
        this.chatService.updatePopupUser(username);
    }
}

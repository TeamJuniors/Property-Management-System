import { Message } from '../../models/message-model';
import { ChatService } from '../../services/chat-service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'chat-box',
    templateUrl: 'app/chat/chat-popup/chat-popup.component.html'
})
export class ChatPopupComponent implements OnInit {
    username: string;

    allMessages: any[];

    constructor(private chatService: ChatService) {
        this.username = '';
    }

    ngOnInit() {
        this.chatService.popupUsername.subscribe(x => this.username = x.popupUsername);
        this.chatService.allMessages.subscribe(x => this.allMessages = x.allMessages);
        $('.sent-message.received-message').html('');
        this.chatService.getMessages(this.chatService.getCurrentUser().username, this.username);
        this.scrollDown();
    }

    create(username: string) {
        this.username = username;
        $('chat-box').css('display', 'block');
        this.getAllMessages();
        this.scrollDown();
    }

    closePopup() {
        $('chat-box').css('display', 'none');
    }

    sendMessage() {
        const message = $('.message-input').val();
        this.chatService.sendMessage(message, this.username, new Date());
        $('.message-input').val('');
        this.getAllMessages();
        this.scrollDown();
    }

    scrollDown() {
        $('.popup-messages').animate({ scrollTop: $('body').height() }, 'slow');
    }

    getAllMessages() {
        $('.sent-message.received-message').html('');
        this.chatService.getMessages(this.chatService.getCurrentUser().username, this.username);
    }
}
import { timer } from 'rxjs/observable/timer';
import { Message } from '../models/message-model';
import { BehaviorSubject, Observable, Observer, Subscriber } from 'rxjs/Rx';
import { User } from '../models/user-model';
import { Chat } from '../models/chat-model';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Input, Output } from '@angular/core';

@Injectable()
export class ChatService {
    onlineUsers: BehaviorSubject<{ onlineUsers: User[] }>;

    socket: SocketIOClient.Socket;

    popupUsername: BehaviorSubject<{ popupUsername: string }>;

    allMessages: BehaviorSubject<{ allMessages: any[] }>;

    constructor() {
        this.onlineUsers = new BehaviorSubject({ onlineUsers: null });
        this.popupUsername = new BehaviorSubject({ popupUsername: '' });
        this.allMessages = new BehaviorSubject({ allMessages: [] });
        this.manageSocket();
    }

    manageSocket() {
        this.socket = io.connect('localhost:3000');
        this.socket.on('connection', () => {
            if (localStorage.getItem('currentUser') != undefined) {
                this.connectUser();
            }
        });

        this.socket.on('send-online-users', (onlineUsers: User[]) => {
            if (!onlineUsers.map(x => x.username).includes(this.popupUsername.value.popupUsername)) {
                $('chat-box').css('display', 'none');
            }

            this.onlineUsers.next({ onlineUsers: onlineUsers });
        });

        this.socket.on('send-chat', (chat: Chat) => {
            const currentUsername = this.getCurrentUser().username;

            const currentFirstOrSecond = chat.firstUser === this.getCurrentUser().username ? 'first' : 'second';

            if ((chat.firstUser === this.getCurrentUser().username && this.popupUsername.value.popupUsername === chat.secondUser) ||
                (chat.secondUser === this.getCurrentUser().username && this.popupUsername.value.popupUsername === chat.firstUser)) {
                let firstMessages = chat.firstUserMessages.map((x) => {
                    return {
                        text: x.text,
                        time: new Date(x.time),
                        type: 'first'
                    };
                });

                let secondMessages = chat.secondUserMessages.map((x) => {
                    return {
                        text: x.text,
                        time: new Date(x.time),
                        type: 'second'
                    };
                });

                const allMessages = firstMessages.concat(secondMessages).sort((a: Message, b: Message) => {
                    return a.time.getTime() - b.time.getTime();
                });

                for (let message of allMessages) {
                    if (message.type === currentFirstOrSecond) {
                        message.type = 'sent-message';
                    } else {
                        message.type = 'received-message';
                    }
                }

                this.allMessages.next({ allMessages: allMessages });
                $('.popup-messages').animate({ scrollTop: $('body').height() }, 'slow');
            }
        });
    }

    connectUser() {
        const localStorageUser = this.getCurrentUser();
        if (localStorageUser) {
            this.socket.emit('user-connect', localStorageUser.username);
        }
    }

    logoutUser(username: string) {
        this.socket.emit('user-logout', username);
    }

    sendMessage(message: string, toUsername: string, time: Date) {
        const localStorageUser = this.getCurrentUser();
        this.socket.emit('send-message', message, localStorageUser.username, toUsername, time);
    }

    updatePopupUser(username: string) {
        this.popupUsername.next({ popupUsername: username });
        $('.sent-message.received-message').html('');
        this.getMessages(this.getCurrentUser().username, username);
        $('.popup-messages').animate({ scrollTop: $('body').height() }, 'slow');
    }

    getMessages(firstUser: string, secondUser: string) {
        this.socket.emit('get-messages', firstUser, secondUser);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getOnlineUsers(user: User) {
        this.socket.emit('get-online-users', user);
    }
}
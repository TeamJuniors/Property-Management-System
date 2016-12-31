import { Message } from './message-model';

export class Chat {
    firstUser: string;
    secondUser: string;
    firstUserMessages: Message[];
    secondUserMessages: Message[];
}
import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../service/chat.service';
import {ChatMessage} from '../../models/chat-message';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    message: string;
    messages = '';

    constructor(private chat: ChatService) {
    }

    ngOnInit() {
        this.chat.messageSubject.subscribe((message: ChatMessage) => {
            this.newMessage(message);
        });
    }

    /**
     * send message
     *
     */
    sendMessage() {
        this.chat.sendMessage(this.message);
        this.message = '';
    }

    newMessage(message: ChatMessage) {
        this.messages += '\n' + message.sender + ' : ' + message.text;
    }
}

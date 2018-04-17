import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor(private chat: ChatService) {
  }

  ngOnInit() {

  }

  sendMessage() {
    this.chat.sendMessage('Test Message');
  }
}
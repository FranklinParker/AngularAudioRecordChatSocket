import {Injectable} from '@angular/core';

import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {Subject} from "rxjs/Subject";


@Injectable()
export class ChatService {
  private socket: SocketIOClient.Socket;
  messageSubject = new Subject<any>();
  constructor() {
    this.socket = io.connect(environment.ws_url);
    this.socket.on('message', (message) => {
      console.log('got message', message);
      this.messageSubject.next(message);
    });

  }


  sendMessage(message: any) {
    this.socket.send(message);
  }

}

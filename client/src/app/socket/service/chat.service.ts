import {Injectable} from '@angular/core';

import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';


@Injectable()
export class ChatService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect(environment.ws_url);
    this.socket.on('message', (message) => {
      console.log('got message', message);
    });

  }


  sendMessage(message: any) {
    this.socket.send(message);

  }

}

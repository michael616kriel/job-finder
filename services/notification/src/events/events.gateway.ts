import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer } from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
const l = console.log

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer() server;

  constructor() {

  }

  @SubscribeMessage('message')
  async onMessage(client: any, payload: any): Promise<any> {
    console.log(payload)
    return of(payload);
  }

  @SubscribeMessage('connection')
  onConnect(client: any, payload: any): void {
    console.log('someone connected')
  }

  @SubscribeMessage('disconnect')
  onDisconnect(client: any, payload: any): void {
    console.log('someone disconnected')
  }

}
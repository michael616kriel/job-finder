import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer } from '@nestjs/websockets';
import { Observable, of } from 'rxjs';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { map } from 'rxjs/operators'
const l = console.log

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer() server;

  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<any>,
  ) {

  }

  @SubscribeMessage('message')
  async onMessage(client: any, payload: any): Promise<any> {
    console.log(payload)

    let message = {
      timestamp: new Date(),
      owner: payload.uid,
      message: payload.message,
    }

    const chat = await this.chatModel.findOneAndUpdate({ uids: { $all: [payload.contactID, payload.uid] } }, { $push: { messages: message } })
    const updatedChat = await this.chatModel.findOne({ uids: { $all: [payload.contactID, payload.uid] } })
    client.emit('receive-message', updatedChat)

    return of(payload);
  }

  @SubscribeMessage('select-contact')
  async selectContact(client: any, payload: any): Promise<any> {
    console.log(payload)

    const chat = await this.chatModel.findOne({ uids: { $all: [payload.contactID, payload.uid] } })
    if (!chat) {
      const newChat = this.chatModel({
        uids: [payload.contactID, payload.uid],
      })
      await newChat.save()
      client.emit('contact-change', {
        messages: [],
      })
    } else {
      client.emit('contact-change', {
        messages: chat.messages,
      })
    }

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
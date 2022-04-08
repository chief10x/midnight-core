import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('hi')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    client.emit("hello", "salam be roie mahet");
  }
}

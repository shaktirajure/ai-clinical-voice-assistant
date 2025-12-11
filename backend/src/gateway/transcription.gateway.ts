// import {
//     WebSocketGateway,
//     WebSocketServer,
//     SubscribeMessage,
//     MessageBody,
//   } from '@nestjs/websockets';
//   import { Server } from 'socket.io';
//   import { spawn } from 'child_process';
//   import * as fs from 'fs';
  
//   @WebSocketGateway({
//     cors: { origin: '*' },
//   })
//   export class TranscriptionGateway {
//     @WebSocketServer() server: Server;
  
//     private tempFile = "temp_audio.wav";
//     private writeStream = fs.createWriteStream(this.tempFile);
  
//     @SubscribeMessage('audio:chunk')
//     handleChunk(@MessageBody() chunk: Buffer) {
//       this.writeStream.write(chunk);
//       this.server.emit("transcription:update", "…listening");
//     }
  
//     @SubscribeMessage('audio:stop')
//     handleStop() {
//       this.writeStream.end();
  
//       const python = spawn("python3", [
//         "whisper-service/transcribe.py",
//         this.tempFile,
//       ]);
  
//       python.stdout.on("data", (data) => {
//         const result = JSON.parse(data.toString());
//         this.server.emit("transcription:final", result.text);
//       });
  
//       python.on("close", () => {
//         fs.unlinkSync(this.tempFile);
//         this.writeStream = fs.createWriteStream(this.tempFile);
//       });
//     }
//   }

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import * as fs from 'fs';
import { spawn } from 'child_process';
import * as path from 'path';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class TranscriptionGateway {
  @WebSocketServer() server: Server;

  private chunks: Buffer[] = [];

  @SubscribeMessage('audio:chunk')
  handleChunk(@MessageBody() chunk: any) {
    const buffer = Buffer.isBuffer(chunk)
      ? chunk
      : Buffer.from(chunk);

    this.chunks.push(buffer);

    this.server.emit('transcription:update', '...listening');
  }

  @SubscribeMessage('audio:stop')
  async handleStop() {
    console.log('Received audio:stop, chunks =', this.chunks.length);

    if (this.chunks.length === 0) {
      this.server.emit('transcription:final', 'No audio received.');
      return;
    }

    // 1. Write audio file
    const outputPath = path.join(process.cwd(), 'temp_audio.wav');
    fs.writeFileSync(outputPath, Buffer.concat(this.chunks));

    console.log('Saved audio file:', outputPath);

    // 2. Call Python whisper script
    const python = spawn('python3', [
      path.join(process.cwd(), 'whisper-service', 'transcribe.py'),
      outputPath,
    ]);

    let result = '';

    python.stdout.on('data', (data) => {
      result += data.toString();
    });

    python.stderr.on('data', (err) => {
      console.error('Whisper Error:', err.toString());
    });

    python.on('close', () => {
      console.log('Whisper finished:', result);

      this.server.emit(
        'transcription:final',
        result || 'No transcription returned.'
      );

      this.chunks = [];
    });
  }
}

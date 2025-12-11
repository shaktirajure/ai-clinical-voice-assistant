import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotesService {
  async generateSOAP(transcript: string) {
    const prompt = `
    You are a dental clinical assistant. 
    Generate a concise SOAP note (max 6–8 sentences total) from this conversation.

     Focus only on dental / oral findings. Do NOT invent unrelated conditions.
     Conversation:
    ${transcript}

    Format:
    S:
    O:
    A:
    P:
    `;

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt,
      stream: false,
    });

    return response.data.response;
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('soap')
  async generateSOAP(@Body() body: { transcript: string }) {
    return this.notesService.generateSOAP(body.transcript);
  }
}

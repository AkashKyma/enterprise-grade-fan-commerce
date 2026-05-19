import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

@Controller('cdp')
export class CDPController {
  constructor(@InjectRepository(Event) private events: Repository<Event>) {}

  @Post('ingest')
  async ingest(@Body() body: { userId: string; type: string; payload?: any }) {
    const e = this.events.create({ userId: body.userId, type: body.type, payload: body.payload || {} });
    return this.events.save(e);
  }
}

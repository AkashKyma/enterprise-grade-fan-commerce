import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Profile } from './profile.entity';
import { CDPController } from './cdp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Profile])],
  controllers: [CDPController],
})
export class CDPModule {}

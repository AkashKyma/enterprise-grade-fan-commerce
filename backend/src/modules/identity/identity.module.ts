import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityController } from './identity.controller';
import { User } from './user.entity';
import { AccountLink } from './link.entity';
import { IdentityService } from './identity.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, AccountLink])],
  controllers: [IdentityController],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}

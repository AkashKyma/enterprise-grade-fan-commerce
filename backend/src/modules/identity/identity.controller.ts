import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
  constructor(private readonly svc: IdentityService) {}

  @Post('upsert')
  async upsert(@Body() body: any) {
    return this.svc.upsertUserByEmailOrPhone(body);
  }

  @Post(':id/link')
  async link(@Param('id') id: string, @Body() body: any) {
    return this.svc.linkProvider(id, body.provider, body.providerId, body.meta || {});
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.svc.getUser(id);
  }
}

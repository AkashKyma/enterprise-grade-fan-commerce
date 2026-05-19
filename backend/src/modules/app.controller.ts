import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response) {
    res.redirect(302, 'http://localhost:8080');
  }

  @Get('health')
  health() {
    return {
      status: 'ok',
      api: 'http://localhost:3000',
      ui: 'http://localhost:8080',
      endpoints: [
        'POST /identity/upsert',
        'POST /identity/:id/link',
        'GET /identity/:id',
        'POST /cdp/ingest',
      ],
    };
  }
}

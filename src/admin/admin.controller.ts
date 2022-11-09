import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('key')
  secretKeyCheck(@Body('secretKey') key: string) {
    return this.adminService.secretKeyCheck(key);
  }
}

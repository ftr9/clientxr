import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  private readonly secretKey: string = 'admin12345';
  secretKeyCheck(key: string) {
    if (key === this.secretKey) {
      return {
        status: 'success',
      };
    } else {
      return { status: 'fail' };
    }
  }
}

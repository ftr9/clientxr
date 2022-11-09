import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdmissionModule } from './admission/admission.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AdminModule } from './admin/admin.module';
import * as path from 'node:path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../client/frontend'),
    }),
    AdmissionModule,
    PrismaModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <--- 1. Import dòng này
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // 2. Thêm dòng này vào đầu mảng imports
    ConfigModule.forRoot({
      isGlobal: true, // Để dùng được biến môi trường ở khắp nơi
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

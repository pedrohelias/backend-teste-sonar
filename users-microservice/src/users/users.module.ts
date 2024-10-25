import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UserMicroserviceController } from './users.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserMicroserviceController],
  providers: [],
})
export class UsersModule {}

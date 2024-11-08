import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { TeacherMicroserviceController } from './teacher.controller';

@Module({
  imports: [NatsClientModule, PrismaModule],
  controllers: [TeacherMicroserviceController],
  providers: [],
})
export class TeachersModule {}

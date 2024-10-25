import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { StudentMicroserviceController } from './student.controller';

@Module({
  imports: [NatsClientModule, PrismaModule],
  controllers: [StudentMicroserviceController],
  providers: [],
})
export class StudentsModule {}

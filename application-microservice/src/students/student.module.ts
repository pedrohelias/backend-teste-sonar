import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { StudentMicroserviceController } from './student.controller';
import { StudentsPrismaService } from './student.prisma'
import { StudentsService } from './student.service';

@Module({
  imports: [NatsClientModule, PrismaModule],
  controllers: [StudentMicroserviceController],
  providers: [StudentsPrismaService, StudentsService],
})
export class StudentsModule {}

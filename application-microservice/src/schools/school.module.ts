import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { SchoolMicroserviceController } from './school.controller';
import { SchoolsPrismaService } from './school.prisma';
import { SchoolsService } from './school.service';

@Module({
  imports: [NatsClientModule, PrismaModule],
  controllers: [SchoolMicroserviceController],
  providers: [SchoolsPrismaService, SchoolsService],
  exports: [SchoolsPrismaService, SchoolsService],
})
export class SchoolsModule {}

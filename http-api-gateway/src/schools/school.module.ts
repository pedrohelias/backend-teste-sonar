import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { SchoolsController } from './school.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [SchoolsController],
  providers: [],
})
export class SchoolModule {}

import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { StudentsController } from './student.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [StudentsController],
  providers: [],
})
export class StudentModule {}

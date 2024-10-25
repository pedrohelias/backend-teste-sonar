import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateStudentDto } from './dtos/CreateStudent.dto';

@Controller('students')
export class StudentsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    this.natsClient.emit('createStudent', createStudentDto);
  }
}

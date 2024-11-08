import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';

@Controller('teachers')
export class TeacherController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @Post()
  createTeacher(@Body() createteacherDto: CreateTeacherDto) {
    this.natsClient.emit('createTeacher', createteacherDto);
  }

  @Get()
  async listTeacher() {
    return this.natsClient.send('listTeacher', {});
  }
}

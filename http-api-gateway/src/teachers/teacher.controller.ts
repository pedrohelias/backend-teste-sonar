import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { lastValueFrom } from 'rxjs';

@Controller('teachers')
export class TeacherController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @Post()
  async createTeacher(@Body() createteacherDto: CreateTeacherDto) {
    try {
      const response = await lastValueFrom(
        this.natsClient.send('createTeacher', createteacherDto)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async listTeacher() {
    return this.natsClient.send('listTeacher', {});
  }
}

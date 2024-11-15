import { BadRequestException, Body, Controller, Get, Param, Inject, Post, Delete, Patch, HttpCode } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { lastValueFrom } from 'rxjs';

@Controller('teachers')
export class TeacherController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }
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

  @Get(':teacherId')
  async getTeacher(@Param('teacherId') teacherId: string) {
    return await this.natsClient.send('getTeacher', teacherId);
  }

  @Delete(':teacherId')
  @HttpCode(204)
  async deleteTeacher(@Param('teacherId') teacherId: string) {
    
      return await lastValueFrom(this.natsClient.send('deleteTeacher', teacherId));
    
  }

  @Patch(':teacherId')
  updateTeacher(@Param('teacherId') teacherId: string, @Body() updateTeacherDto: CreateTeacherDto) {
    this.natsClient.emit('updateTeacher', { data: updateTeacherDto, teacherId: teacherId });
  }


}

import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateSchoolDto } from './dtos/CreateSchool.dto';

@Controller('schools')
export class SchoolsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @Post()
  createSchool(@Body() createSchoolDto: CreateSchoolDto) {
    this.natsClient.emit('createSchool', createSchoolDto);
  }

  @Get()
  async listSchools() {
    return await this.natsClient.send('listSchool', {});
  }
}

import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { CreateSchoolDto } from './dtos/CreateStudent.dto';
import { SchoolsService } from './school.service';
import { SchoolResponseDto } from './dtos/SchoolResponse.dto';

@Controller()
export class SchoolMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClients: ClientProxy,
    private readonly schoolService: SchoolsService,
  ) {}

  @EventPattern('createSchool')
  async createStudent(@Payload() createSchoolDto: CreateSchoolDto) {
    await this.schoolService.create(createSchoolDto);
  }

  @MessagePattern('listSchool')
  async getAllSchools(): Promise<SchoolResponseDto[]> {
    return await this.schoolService.findAll();
  }
}

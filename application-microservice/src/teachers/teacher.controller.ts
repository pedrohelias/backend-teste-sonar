import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload,  MessagePattern, } from '@nestjs/microservices';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { TeacherResponseDto } from './dtos/TeacherResponse.dto';
import { TeachersService } from './teacher.service';

@Controller()
export class TeacherMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClients: ClientProxy,
    private prisma: PrismaService,
    private readonly teachersService: TeachersService,
  ) {}

  @EventPattern('createTeacher')
  async createTeacher(@Payload() createTeacherDto: CreateTeacherDto) {
    console.log('NATS RECEIVING', createTeacherDto);

    await this.prisma.teacher.create({
      data: {
        name: createTeacherDto.name,
        age: createTeacherDto.age,
        cpf: createTeacherDto.cpf,
        startDate: createTeacherDto.startDate,
      },
    });

    this.natsClients.emit('teacherCreated', createTeacherDto);
  }

  @MessagePattern('listTeacher')
  async getAllTeachers(): Promise<TeacherResponseDto[]> {
    return await this.teachersService.findAll();
  }
}

import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';

@Controller()
export class TeacherMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClients: ClientProxy,
    private prisma: PrismaService,
  ) {}

  @EventPattern('createTeacher')
  async createStudent(@Payload() createTeacherDto: CreateTeacherDto) {
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
}

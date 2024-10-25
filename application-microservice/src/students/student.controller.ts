import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from 'src/database/prisma.service';
import { CreateStudentDto } from './dtos/CreateStudent.dto';

@Controller()
export class StudentMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClients: ClientProxy,
    private prisma: PrismaService,
  ) {}

  @EventPattern('createStudent')
  async createStudent(@Payload() createStudentDto: CreateStudentDto) {
    console.log('NATS RECEIVING', createStudentDto);

    await this.prisma.student.create({
      data: {
        name: createStudentDto.name,
        monthlyPaymentValue: createStudentDto.monthlyPaymentValue,
      },
    });

    this.natsClients.emit('studentCreated', createStudentDto);
  }
}

import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller()
export class UserMicroserviceController {
  constructor(private prisma: PrismaService) {}

  @MessagePattern({
    cmd: 'createUser',
  })
  async createUser(@Payload() createUserDto: CreateUserDto) {
    await this.prisma.user.create({
      data: {
        displayName: createUserDto.displayName,
        email: createUserDto.email,
        username: createUserDto.username,
      },
    });
    return createUserDto;
  }

  @EventPattern('studentCreated')
  studentCreated(@Payload() data: any) {
    console.log('Evento recebido de outro serviço:', data);
  }
}

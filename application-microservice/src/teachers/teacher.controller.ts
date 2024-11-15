import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload, MessagePattern, } from '@nestjs/microservices';
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
  ) { }
  @MessagePattern('createTeacher')
  async createTeacher(@Payload() createTeacherDto: CreateTeacherDto) {
    try {
      const teacher = await this.prisma.teacher.create({
        data: {
          name: createTeacherDto.name,
          age: createTeacherDto.age,
          cpf: createTeacherDto.cpf,
          startDate: new Date(createTeacherDto.startDate),
        },
      });

      return {
        success: true,
        data: teacher,
        message: 'Teacher created successfully'
      };
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'CPF already exists',
          code: 'UNIQUE_CONSTRAINT'
        };
      }
      if (error.code === 'P2000'){
        return {
          success: false,
          error: 'Value too long for the column',
          code: 'META_TARGET'
        };
      }
      throw error;
    }
  }

  @MessagePattern('listTeacher')
  async getAllTeachers(): Promise<TeacherResponseDto[]> {
    return await this.teachersService.findAll();
  }

  @MessagePattern('getTeacher')
  async get(@Payload() teacherId: string): Promise<TeacherResponseDto> {
    return await this.teachersService.get(teacherId);
  }

  @EventPattern('deleteTeacher')
  async disable(@Payload() teacherId: string) {
    await this.teachersService.delete(teacherId);
  }

  @MessagePattern('updateTeacher')
  async update(
    @Payload() input: { data: CreateTeacherDto; teacherId: string },
  ): Promise<TeacherResponseDto> {
    return await this.teachersService.update(input);
  }

}

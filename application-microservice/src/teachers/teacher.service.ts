// src/modules/schools/services/schools.service.ts
import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { TeacherResponseDto } from './dtos/TeacherResponse.dto';
import { TeachersPrismaService } from './teacher.prisma';

@Injectable()
export class TeachersService {
  constructor(private readonly teachersPrismaService: TeachersPrismaService) {}

  async create(data: CreateTeacherDto) {
    return await this.teachersPrismaService.createTeacher(data);
  }

  async findAll(): Promise<TeacherResponseDto[]> {
    return await this.teachersPrismaService.findAllTeachers();
  }
}

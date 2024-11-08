// src/modules/schools/prisma/schools.prisma.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';
import { TeacherResponseDto } from './dtos/TeacherResponse.dto';

@Injectable()
export class TeachersPrismaService {
  constructor(private prisma: PrismaService) {}

  async createTeacher(data:CreateTeacherDto) {
    return await this.prisma.teacher.create({ data });
  }

  async findAllTeachers(): Promise<TeacherResponseDto[]> {
    return await this.prisma.teacher.findMany();
  }
}
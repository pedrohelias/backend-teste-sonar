// src/modules/schools/prisma/schools.prisma.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSchoolDto } from './dtos/CreateStudent.dto';
import { SchoolResponseDto } from './dtos/SchoolResponse.dto';

@Injectable()
export class SchoolsPrismaService {
  constructor(private prisma: PrismaService) {}

  async createSchool(data: CreateSchoolDto) {
    return await this.prisma.school.create({ data });
  }

  async findAllSchools(): Promise<SchoolResponseDto[]> {
    return await this.prisma.school.findMany();
  }
}

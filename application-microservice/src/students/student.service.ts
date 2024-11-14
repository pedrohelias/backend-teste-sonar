import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dtos/CreateStudent.dto';
import { StudentResponseDto } from './dtos/StudentResponse.dto';
import { StudentsPrismaService } from './student.prisma';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsPrismaService: StudentsPrismaService) {}

  async create(data: CreateStudentDto) {
    return await this.studentsPrismaService.create(data);
  }

  async findAll(): Promise<StudentResponseDto[]> {
    return await this.studentsPrismaService.findAll();
  }

  async get(studentId: string): Promise<StudentResponseDto> {
    return await this.studentsPrismaService.get(studentId);
  }

  async update(input: { data: CreateStudentDto; studentId: string }): Promise<StudentResponseDto> {
    return await this.studentsPrismaService.update(input);
  }

  async disable(studentId: string): Promise<StudentResponseDto> {
    return await this.studentsPrismaService.disable(studentId);
  }
}

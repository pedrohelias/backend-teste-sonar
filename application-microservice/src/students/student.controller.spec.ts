import { Test } from '@nestjs/testing';
import { CreateStudentDto } from './dtos/CreateStudent.dto';
import { StudentMicroserviceController } from './student.controller';
import { StudentsModule } from './student.module';

describe('StudentsController', () => {
  let studentsController: StudentMicroserviceController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [StudentsModule],
    }).compile();

    studentsController = module.get(StudentMicroserviceController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getAll', () => {
    it('Should return an array of students', async () => {
      expect(await studentsController.getAll()).toBeInstanceOf(Array<object>);
    });
  });

  describe('get', () => {
    it('Should return a student', async () => {
      const response = await studentsController.create({
        name: 'Student',
        categorie: 'PARCIAL',
        class: 'BERCARIO',
        turn: 'MATUTINO',
      });

      const studentId = response.data.id;

      expect(await studentsController.get(studentId)).toBeInstanceOf(Object);
    });
  });

  describe('create', () => {
    it('Should create a student', async () => {
      const createStudent: CreateStudentDto = {
        name: 'Student',
        categorie: 'PARCIAL',
        class: 'BERCARIO',
        turn: 'MATUTINO',
      };

      const { message, data } = await studentsController.create(createStudent);

      expect(message).toBe('Student created successfully');
      expect(data).toBeInstanceOf(Object);
    });
  });

  describe('update', () => {
    it('Should update a student', async () => {
      const response = await studentsController.create({
        name: 'Student',
        categorie: 'PARCIAL',
        class: 'BERCARIO',
        turn: 'MATUTINO',
      });

      const studentId = response.data.id;

      const updatedStudent: CreateStudentDto = {
        name: 'Student',
        categorie: 'INTEGRAL',
        class: 'BERCARIO',
        turn: 'MATUTINO',
      };

      const { message, data } = await studentsController.update({
        data: updatedStudent,
        studentId,
      });

      expect(message).toBe('Student updated successfully');
      expect(data).toMatchObject(updatedStudent);
    });
  });

  describe('disable', () => {
    it('should disable a student', async () => {
      const response = await studentsController.create({
        name: 'Student',
        categorie: 'PARCIAL',
        class: 'BERCARIO',
        turn: 'MATUTINO',
      });

      const studentId = response.data.id;

      const { message } = await studentsController.disable(studentId);

      expect(message).toBe('Student deleted successfully');
    });
  });
});

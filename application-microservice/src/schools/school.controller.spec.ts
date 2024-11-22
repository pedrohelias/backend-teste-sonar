import { Test } from '@nestjs/testing';
import { CreateSchoolDto } from './dtos/CreateStudent.dto';
import { SchoolMicroserviceController } from './school.controller';
import { SchoolsModule } from './school.module';

describe('SchoolController', () => {
  let schoolController: SchoolMicroserviceController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [SchoolsModule],
    }).compile();

    schoolController = module.get(SchoolMicroserviceController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getAll', () => {
    it('Should return an array of students', async () => {
      expect(await schoolController.getAllSchools()).toBeInstanceOf(
        Array<object>,
      );
    });
  });

  describe('get', () => {
    it('Should return a school', async () => {
      const response = await schoolController.createSchool({
        name: 'School',
        directorEmail: 'director@email.com',
        numberStudents: 300,
      });

      const schoolId = response.id;

      expect(await schoolController.get(schoolId)).toBeInstanceOf(Object);
    });
  });

  describe('create', () => {
    it('Should create a school', async () => {
      const createSchool: CreateSchoolDto = {
        name: 'School',
        directorEmail: 'director@email.com',
        numberStudents: 300,
      };

      const createdSchool = await schoolController.createSchool(createSchool);

      expect(createdSchool).toBeInstanceOf(Object);
    });
  });

  describe('update', () => {
    it('Should update a school', async () => {
      const response = await schoolController.createSchool({
        name: 'School',
        directorEmail: 'director@email.com',
        numberStudents: 300,
      });

      const schoolId = response.id;

      const updatedSchoolObject: CreateSchoolDto = {
        name: 'School',
        directorEmail: 'director@email.com',
        numberStudents: 300,
      };

      const updatedSchool = await schoolController.update({
        data: updatedSchoolObject,
        schoolId,
      });

      expect(updatedSchool).toMatchObject(updatedSchoolObject);
    });
  });

  describe('disable', () => {
    it('should disable a school', async () => {
      const response = await schoolController.createSchool({
        name: 'School',
        directorEmail: 'director@email.com',
        numberStudents: 300,
      });

      const schoolId = response.id;

      const updatedSchool = await schoolController.disable(schoolId);

      expect(updatedSchool).toBeInstanceOf(Object);
    });
  });
});

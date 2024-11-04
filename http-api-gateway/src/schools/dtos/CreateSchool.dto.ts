import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  directorEmail: number;

  @IsInt()
  @IsNotEmpty()
  numberStudents: number;
}

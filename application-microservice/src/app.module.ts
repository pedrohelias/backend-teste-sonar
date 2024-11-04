import { Module } from '@nestjs/common';
import { SchoolsModule } from './schools/school.module';
import { StudentsModule } from './students/student.module';

@Module({
  imports: [StudentsModule, SchoolsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

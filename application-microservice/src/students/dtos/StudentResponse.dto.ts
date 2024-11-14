import { CategorieType, ClassType, TurnType } from '@prisma/client';

export class StudentResponseDto {
  id: string;
  name: string;
  categorie: CategorieType;
  class: ClassType;
  turn: TurnType;
}

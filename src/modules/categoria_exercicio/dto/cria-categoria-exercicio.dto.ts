import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriaCategoriaExercicioDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o ID do Usuário',
  })
  id_categoria: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o ID do Exercício',
  })
  id_exercicio: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a quantidade de séries',
  })
  series: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a quantidade de repetições',
  })
  repeticoes: number;
}

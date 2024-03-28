import {
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriaExercicioDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Nome',
  })
  @IsString()
  nome: string;

  @ApiProperty()
  @IsOptional()
  gifUrl?: any;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a Descrição',
  })
  @IsString()
  descricao: string;
}

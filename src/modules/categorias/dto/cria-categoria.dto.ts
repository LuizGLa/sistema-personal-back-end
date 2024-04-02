import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriaCategoriaDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Nome',
  })
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o ID da ficha',
  })
  @IsString()
  id_ficha: string;

  @ApiProperty()
  @IsOptional()
  id_usuario?: string;
}

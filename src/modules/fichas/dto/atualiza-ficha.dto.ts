import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizaExercicioDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty()
  @IsOptional()
  gifUrl?: any;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descricao?: string;
}

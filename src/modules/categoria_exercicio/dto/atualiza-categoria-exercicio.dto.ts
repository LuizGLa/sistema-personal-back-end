import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizaCategoriaExercicioDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id_categoria?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  id_exercicio?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  series?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  repeticoes?: number;
}

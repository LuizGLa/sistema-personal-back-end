import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizaCategoriaDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty()
  @IsOptional()
  id_usuario?: string;

  @ApiProperty()
  @IsOptional()
  id_ficha?: string;
}

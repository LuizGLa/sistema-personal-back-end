import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BuscaCategoriaExercicioFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  pesquisa?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pagina?: string;
}

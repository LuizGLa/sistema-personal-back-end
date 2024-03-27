import { IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizaAlunoDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  situacao?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  login?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  idade?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  peso?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  altura?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  senha?: string;
}

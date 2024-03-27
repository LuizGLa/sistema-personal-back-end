import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriaAlunoDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Nome',
  })
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a situação do Usuário',
  })
  @IsString()
  situacao: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Login',
  })
  @IsString()
  login: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  idade: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  peso: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  altura: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a Senha',
  })
  @IsString()
  senha: string;
}

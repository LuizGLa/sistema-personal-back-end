import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import * as ConfigEnv from '@nestjs/config';
import { AlunoModule } from './modules/alunos/aluno.module';
import { ExercicioModule } from './modules/exercicios/exercicio.module';

@Module({
  imports: [
    ConfigEnv.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UsuarioModule,
    AlunoModule,
    ExercicioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

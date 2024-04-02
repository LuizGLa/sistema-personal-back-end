import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/plugins/database/database.module';
import { CategoriaExercicioService } from './categoria-exercicio.service';
import { CategoriaExercicioController } from './categoria-exercicio.controller';
import { PassportModule } from '@nestjs/passport';
import { PaginateService } from 'src/utils/paginate/paginate.service';

@Module({
  exports: [CategoriaExercicioService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [CategoriaExercicioController],
  providers: [CategoriaExercicioService, PaginateService],
})
export class CategoriaExercicioModule { }

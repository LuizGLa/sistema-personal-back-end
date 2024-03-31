import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/plugins/database/database.module';
import { ExercicioService } from './ficha.service';
import { ExercicioController } from './ficha.controller';
import { PassportModule } from '@nestjs/passport';
import { PaginateService } from 'src/utils/paginate/paginate.service';

@Module({
  exports: [ExercicioService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [ExercicioController],
  providers: [ExercicioService, PaginateService],
})
export class ExercicioModule { }

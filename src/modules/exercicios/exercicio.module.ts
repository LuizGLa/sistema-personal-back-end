import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/plugins/database/database.module';
import { ExercicioService } from './exercicio.service';
import { ExercicioController } from './exercicio.controller';
import { PassportModule } from '@nestjs/passport';
import { PaginateService } from 'src/utils/paginate/paginate.service';
import { PrismaService } from 'src/plugins/database/services/prisma.service';

@Module({
  exports: [ExercicioService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [ExercicioController],
  providers: [ExercicioService, PrismaService, PaginateService],
})
export class ExercicioModule { }

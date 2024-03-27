import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/plugins/database/database.module';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { PassportModule } from '@nestjs/passport';
import { PaginateService } from 'src/utils/paginate/paginate.service';

@Module({
  exports: [AlunoService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [AlunoController],
  providers: [AlunoService, PaginateService],
})
export class AlunoModule { }

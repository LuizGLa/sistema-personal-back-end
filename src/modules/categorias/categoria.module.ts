import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/plugins/database/database.module';
import { CategoriaController } from './categoria.controller';
import { PassportModule } from '@nestjs/passport';
import { PaginateService } from 'src/utils/paginate/paginate.service';
import { CategoriaService } from './categoria.service';

@Module({
  exports: [CategoriaService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService, PaginateService],
})
export class CategoriaModule { }

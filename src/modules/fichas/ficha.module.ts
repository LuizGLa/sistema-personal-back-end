import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/plugins/database/database.module';
import { FichaService } from './ficha.service';
import { FichaController } from './ficha.controller';
import { PassportModule } from '@nestjs/passport';
import { PaginateService } from 'src/utils/paginate/paginate.service';

@Module({
  exports: [FichaService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [FichaController],
  providers: [FichaService, PaginateService],
})
export class FichaModule { }

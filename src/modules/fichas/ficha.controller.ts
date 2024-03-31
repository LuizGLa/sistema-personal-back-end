import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AtualizaExercicioDto } from './dto/atualiza-ficha.dto';
import { CriaExercicioDto } from './dto/cria-ficha.dto';
import { ExercicioService } from './ficha.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../usuarios/enum/usuario-roles.enum';

@ApiBearerAuth()
@Controller('exercicios')
@ApiTags('Exercicios')
export class ExercicioController {
  constructor(private readonly exercicioService: ExercicioService) { }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @UseInterceptors(FileInterceptor('gifUrl'))
  cria(
    @Body() dados: CriaExercicioDto,
    @UploadedFile() gifUrl: Express.Multer.File
  ): Promise<any> {
    return this.exercicioService.cria(dados, gifUrl);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  findAll(
    @Query('pagina') pagina: number,
    @Query('itensPorPagina') itensPorPagina: number,
    @Query('busca') busca?: string,
    @Query('filtro') filtro?: string,
    @Query('valor') valor?: string,
  ) {
    return this.exercicioService.findAll(
      pagina,
      itensPorPagina,
      busca,
      filtro?.split(','),
      valor?.split(','),
    );
  }


  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  findOne(@Param('id') id: string) {
    return this.exercicioService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @UseInterceptors(FileInterceptor('gifURL'))
  update(
    @Param('id') id: string,
    @UploadedFile() gifUrl: Express.Multer.File,
    @Body() updateExercicioDto: AtualizaExercicioDto,
  ) {
    return this.exercicioService.update(
      id,
      updateExercicioDto,
      gifUrl,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  remove(@Param('id') id: string) {
    return this.exercicioService.remove(id);
  }

}
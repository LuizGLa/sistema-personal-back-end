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
  Patch,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AtualizaCategoriaExercicioDto } from './dto/atualiza-categoria-exercicio.dto';
import { CriaCategoriaExercicioDto } from './dto/cria-categoria-exercicio.dto';
import { CategoriaExercicioService } from './categoria-exercicio.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../usuarios/enum/usuario-roles.enum';

@ApiBearerAuth()
@Controller('categorias-exercicios')
@ApiTags('categorias-exercicios')
export class CategoriaExercicioController {
  constructor(private readonly categoriaExercicioService: CategoriaExercicioService) { }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  cria(
    @Body() dados: CriaCategoriaExercicioDto,
  ): Promise<any> {
    return this.categoriaExercicioService.cria(dados);
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
    return this.categoriaExercicioService.findAll(
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
    return this.categoriaExercicioService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoriaExercicioDto: AtualizaCategoriaExercicioDto,
  ) {
    return this.categoriaExercicioService.update(
      id,
      updateCategoriaExercicioDto,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  remove(@Param('id') id: string) {
    return this.categoriaExercicioService.remove(id);
  }

}

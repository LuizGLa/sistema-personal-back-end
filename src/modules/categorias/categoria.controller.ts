import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Delete,
  Query,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AtualizaCategoriaDto } from './dto/atualiza-categoria.dto';
import { CriaCategoriaDto } from './dto/cria-categoria.dto';
import { CategoriaService } from './categoria.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../usuarios/enum/usuario-roles.enum';

@ApiBearerAuth()
@Controller('categorias')
@ApiTags('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) { }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  cria(
    @Body() dados: CriaCategoriaDto,
  ): Promise<any> {
    return this.categoriaService.cria(dados);
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
    return this.categoriaService.findAll(
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
    return this.categoriaService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: AtualizaCategoriaDto,
  ) {
    return this.categoriaService.update(
      id,
      updateCategoriaDto,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(id);
  }

}

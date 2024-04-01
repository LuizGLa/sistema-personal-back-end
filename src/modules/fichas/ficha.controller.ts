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
import { AtualizaFichaDto } from './dto/atualiza-ficha.dto';
import { CriaFichaDto } from './dto/cria-ficha.dto';
import { FichaService } from './ficha.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../usuarios/enum/usuario-roles.enum';
import { CriaExercicioDto } from '../exercicios/dto/cria-exercicio.dto';

@ApiBearerAuth()
@Controller('fichas')
@ApiTags('fichas')
export class FichaController {
  constructor(private readonly fichaService: FichaService) { }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  cria(
    @Body() dados: CriaFichaDto,
  ): Promise<any> {
    return this.fichaService.cria(dados);
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
    return this.fichaService.findAll(
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
    return this.fichaService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @UseInterceptors(FileInterceptor('gifURL'))
  update(
    @Param('id') id: string,
    @Body() updateFichaDto: AtualizaFichaDto,
  ) {
    return this.fichaService.update(
      id,
      updateFichaDto,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  remove(@Param('id') id: string) {
    return this.fichaService.remove(id);
  }

}

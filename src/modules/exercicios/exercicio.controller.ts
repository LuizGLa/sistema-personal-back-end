import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AtualizaExercicioDto } from './dto/atualiza-exercicio.dto';
import { CriaExercicioDto } from './dto/cria-exercicio.dto';
import { ExercicioService } from './exercicio.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('exercicio')
@ApiTags('Exercicios')
export class ExercicioController {
  constructor(private readonly exercicioService: ExercicioService) { }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  async cria(@Body() dados: CriaExercicioDto): Promise<any> {
    return this.exercicioService.cria(dados);
  }

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  async buscaTodos(
    @Query('pagina') pagina: number,
    @Query('itensPorPagina') itensPorPagina: number,
    @Query('busca') busca?: string,
  ) {
    return this.exercicioService.buscaTodos(pagina, itensPorPagina, busca);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  async buscaPorId(@Param('id') id: string): Promise<any> {
    return this.exercicioService.buscaPorId(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async atualiza(@Param('id') id: string, @Body() data: AtualizaExercicioDto) {
    return this.exercicioService.atualiza(id, data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  async deleta(@Param('id') id: string) {
    return this.exercicioService.deleta(id);
  }
}

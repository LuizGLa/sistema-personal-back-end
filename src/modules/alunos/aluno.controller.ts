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
import { AtualizaAlunoDto } from './dto/atualiza-aluno.dto';
import { CriaAlunoDto } from './dto/cria-aluno.dto';
import { AlunoService } from './aluno.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('alunos')
@ApiTags('Alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) { }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  async cria(@Body() dados: CriaAlunoDto): Promise<any> {
    return this.alunoService.cria(dados);
  }

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  async buscaTodos(
    @Query('pagina') pagina: number,
    @Query('itensPorPagina') itensPorPagina: number,
    @Query('busca') busca?: string,
  ) {
    return this.alunoService.buscaTodos(pagina, itensPorPagina, busca);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  async buscaPorId(@Param('id') id: string): Promise<any> {
    return this.alunoService.buscaPorId(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async atualiza(@Param('id') id: string, @Body() data: AtualizaAlunoDto) {
    return this.alunoService.atualiza(id, data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  async deleta(@Param('id') id: string) {
    return this.alunoService.deleta(id);
  }
}

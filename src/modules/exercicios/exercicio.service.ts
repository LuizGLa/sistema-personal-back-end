import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriaExercicioDto } from './dto/cria-exercicio.dto';
import { AtualizaExercicioDto } from './dto/atualiza-exercicio.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { PaginateService } from 'src/utils/paginate/paginate.service';
@Injectable()
export class ExercicioService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginateService: PaginateService,
  ) { }

  async cria(data: CriaExercicioDto): Promise<any> {

    const exercicioExists = await this.prismaService.exercicio.findFirst({
      where: {
        nome: data.nome,
      },
    });

    if (exercicioExists) {
      throw new ConflictException('Exercicio já existe');
    }

    const exercicio = this.prismaService.exercicio.create({
      data,
    });

    return exercicio;
  }

  async buscaTodos(pagina: number, itensPorPagina: number, busca?: string) {
    return this.paginateService.paginate({
      module: 'aluno',
      busca,
      pagina,
      itensPorPagina,
    });
  }

  async buscaPorLogin(login: string) {
    const aluno = await this.prismaService.aluno.findUnique({
      where: {
        login,
      },
    });
    return aluno;
  }

  async buscaPorId(id: string) {
    const aluno = await this.prismaService.aluno.findUnique({
      where: {
        id,
      },
    });

    if (!aluno) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return aluno;
  }

  async atualiza(id: string, data: AtualizaAlunoDto) {
    const alunoExists = await this.prismaService.aluno.findUnique({
      where: {
        id,
      },
    });

    if (!alunoExists) {
      throw new NotFoundException('aluno não existe');
    }

    if (data.senha) {
      data.senha = await this.hashSenha(data.senha);
    }

    await this.prismaService.aluno.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleta(id: string) {
    const alunoExists = await this.prismaService.aluno.findUnique({
      where: {
        id,
      },
    });

    if (!alunoExists) {
      throw new NotFoundException('aluno não existe!');
    }

    await this.prismaService.aluno.delete({
      where: {
        id,
      },
    });
  }

  async hashSenha(rawSenha: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawSenha, SALT);
  }

  async comparaSenha(rawSenha: string, hash: string) {
    return bcrypt.compareSync(rawSenha, hash);
  }
}

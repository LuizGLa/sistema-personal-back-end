import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Categoria_Exercicio } from '@prisma/client';
import { CriaCategoriaExercicioDto } from './dto/cria-categoria-exercicio.dto';
import { AtualizaCategoriaExercicioDto } from './dto/atualiza-categoria-exercicio.dto';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { PaginateService } from 'src/utils/paginate/paginate.service';
import { PaginateFichas } from './types/categoria-exercicio.type';


@Injectable()
export class CategoriaExercicioService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginateService: PaginateService,
    private readonly configService: ConfigService,
  ) { }

  async cria(criaCategoriaExercicioDto: CriaCategoriaExercicioDto): Promise<any> {
    try {
      const categoriaExercicio = await this.prismaService.categoria_Exercicio.create({
        data: {
          ...criaCategoriaExercicioDto,
        },
      });
      return categoriaExercicio;
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao criar exercicios com categorias. ${error.message}`,
      );
    }
  }

  async findAll(
    pagina: number,
    itensPorPagina: number,
    busca: string,
    filtro?: string[],
    valor?: string[],
  ): Promise<PaginateFichas | Categoria_Exercicio[]> {
    try {
      const querys = {};

      if (filtro && valor) {
        filtro.forEach((key, index) => {
          querys[key] =
            valor[index] === 'true'
              ? true
              : valor[index] === 'false'
                ? false
                : valor[index];
        });
      }

      if (pagina && itensPorPagina && querys) {
        return this.paginateService.paginate({
          module: 'categoria_exercicio',
          busca,
          pagina,
          itensPorPagina,
          querys,
          orderBy: {
            data_atualizacao: 'desc',
          },
        });
      } else {
        return await this.prismaService.categoria_Exercicio.findMany({
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao listar exercicios com categorias. ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    const categoria_exercicio = await this.prismaService.ficha.findUnique({
      where: { id },
    });

    if (!categoria_exercicio) {
      throw new NotFoundException('Ficha não encontrado na base de dados.');
    }

    return categoria_exercicio;
  }

  private async _get(id: string): Promise<CriaCategoriaExercicioDto> {
    const categoria_exercicio = await this.prismaService.categoria_Exercicio.findUnique({
      where: {
        id,
      },
    });

    if (!categoria_exercicio) {
      throw new NotFoundException('Motorista não encontrado na base de dados.');
    }

    return categoria_exercicio;
  }



  async update(
    id: string,
    atualizaCategoriaExercicioDto: AtualizaCategoriaExercicioDto,
  ) {
    try {
      const categoria_exercicio = await this.prismaService.categoria_Exercicio.update({
        where: {
          id,
        },
        data: atualizaCategoriaExercicioDto,
      });

      return categoria_exercicio;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar motorista.');
    }
  }


  async remove(id: string): Promise<void> {
    try {
      const categoria_exercicio = await this.prismaService.categoria_Exercicio.findUnique({
        where: {
          id,
        },
      });

      if (!categoria_exercicio) {
        throw new NotFoundException('Exercicio com categoria não encontrado na base de dados.');
      }

      await this.prismaService.categoria_Exercicio.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao exercicio com categoria.');
    }
  }
}

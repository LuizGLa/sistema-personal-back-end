import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Categoria } from '@prisma/client';
import { CriaCategoriaDto } from './dto/cria-categoria.dto';
import { AtualizaCategoriaDto } from './dto/atualiza-categoria.dto';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { PaginateService } from 'src/utils/paginate/paginate.service';
import { PaginateFichas } from './types/categoria.type';


@Injectable()
export class CategoriaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginateService: PaginateService,
    private readonly configService: ConfigService,
  ) { }

  async cria(criaCategoriaDto: CriaCategoriaDto): Promise<any> {
    try {
      const categoria = await this.prismaService.categoria.create({
        data: {
          ...criaCategoriaDto,
        },
      });
      return categoria;
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao criar categoria. ${error.message}`,
      );
    }
  }

  async findAll(
    pagina: number,
    itensPorPagina: number,
    busca: string,
    filtro?: string[],
    valor?: string[],
  ): Promise<PaginateFichas | Categoria[]> {
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
          module: 'categoria',
          busca,
          pagina,
          itensPorPagina,
          querys,
          orderBy: {
            updatedAt: 'desc',
          },
        });
      } else {
        return await this.prismaService.categoria.findMany({
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao listar categorias. ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    const categoria = await this.prismaService.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrado na base de dados.');
    }

    return categoria;
  }

  private async _get(id: string): Promise<CriaCategoriaDto> {
    const categoria = await this.prismaService.categoria.findUnique({
      where: {
        id,
      },
    });

    if (!categoria) {
      throw new NotFoundException('Motorista não encontrado na base de dados.');
    }

    return categoria;
  }



  async update(
    id: string,
    atualizaCategoriaDto: AtualizaCategoriaDto,
  ) {
    try {
      const categoria = await this.prismaService.categoria.update({
        where: {
          id,
        },
        data: atualizaCategoriaDto,
      });

      return categoria;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar categoria.');
    }
  }


  async remove(id: string): Promise<void> {
    try {
      const categoria = await this.prismaService.categoria.findUnique({
        where: {
          id,
        },
      });

      if (!categoria) {
        throw new NotFoundException('Categoria não encontrado na base de dados.');
      }

      await this.prismaService.categoria.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar ficha.');
    }
  }
}

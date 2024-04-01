import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ficha } from '@prisma/client';
import { CriaFichaDto } from './dto/cria-ficha.dto';
import { AtualizaFichaDto } from './dto/atualiza-ficha.dto';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { PaginateService } from 'src/utils/paginate/paginate.service';
import { existsSync } from 'fs';
import { unlink, writeFile } from 'fs/promises';
import { extname, join } from 'path';
import { Response } from 'express';
import { PaginateFichas } from './types/ficha.type';


@Injectable()
export class FichaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginateService: PaginateService,
    private readonly configService: ConfigService,
  ) { }

  async cria(criaFichaDto: CriaFichaDto): Promise<any> {
    try {
      const ficha = await this.prismaService.ficha.create({
        data: {
          ...criaFichaDto,
        },
      });
      return ficha;
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao criar ficha. ${error.message}`,
      );
    }
  }

  async findAll(
    pagina: number,
    itensPorPagina: number,
    busca: string,
    filtro?: string[],
    valor?: string[],
  ): Promise<PaginateFichas | Ficha[]> {
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
          module: 'ficha',
          busca,
          pagina,
          itensPorPagina,
          querys,
          orderBy: {
            data_atualizacao: 'desc',
          },
        });
      } else {
        return await this.prismaService.ficha.findMany({
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao listar fichas. ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    const ficha = await this.prismaService.ficha.findUnique({
      where: { id },
    });

    if (!ficha) {
      throw new NotFoundException('Ficha não encontrado na base de dados.');
    }

    return ficha;
  }

  private async _get(id: string): Promise<CriaFichaDto> {
    const ficha = await this.prismaService.ficha.findUnique({
      where: {
        id,
      },
    });

    if (!ficha) {
      throw new NotFoundException('Motorista não encontrado na base de dados.');
    }

    return ficha;
  }



  async update(
    id: string,
    atualizaFichaDto: AtualizaFichaDto,
  ) {
    try {
      const ficha = await this.prismaService.ficha.update({
        where: {
          id,
        },
        data: atualizaFichaDto,
      });

      return ficha;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar motorista.');
    }
  }


  async remove(id: string): Promise<void> {
    try {
      const ficha = await this.prismaService.ficha.findUnique({
        where: {
          id,
        },
      });

      if (!ficha) {
        throw new NotFoundException('Ficha não encontrado na base de dados.');
      }

      await this.prismaService.ficha.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar ficha.');
    }
  }
}

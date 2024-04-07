import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Exercicio } from '@prisma/client';
import { CriaExercicioDto } from './dto/cria-exercicio.dto';
import { AtualizaExercicioDto } from './dto/atualiza-exercicio.dto';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { PaginateService } from 'src/utils/paginate/paginate.service';
import { existsSync } from 'fs';
import { unlink, writeFile } from 'fs/promises';
import { extname, join } from 'path';
import { Response } from 'express';
import { PaginateExercicios } from './types/exercicio.type';


@Injectable()
export class ExercicioService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginateService: PaginateService,
    private readonly configService: ConfigService,
  ) { }

  async cria(criaExercicioDto: CriaExercicioDto, gifUrl: Express.Multer.File): Promise<any> {
    this._validateFileSize(gifUrl);
    this._validateFileExtension(gifUrl);

    const nomeDoArquivo = this._generateUniqueFilename(gifUrl);

    await writeFile(
      join(
        __dirname,
        '..', '..', '..', '..',
        'uploads',
        `${process.env.FILE_PATH}/${nomeDoArquivo}`
      ),
      gifUrl.buffer
    );
    const path = `${this.configService.get<string>('FILE_URL')}${nomeDoArquivo}`;
    try {
      const exercicio = await this.prismaService.exercicio.create({
        data: {
          gifUrl: path,
          ...criaExercicioDto,
        },
      });
      return exercicio;
    } catch (error) {
      await unlink(
        join(
          __dirname,
          '..', '..', '..', '..',
          'uploads',
          `${process.env.FILE_PATH}/${nomeDoArquivo}`
        )
      )
    }
  }


  async findAll(
    pagina: number,
    itensPorPagina: number,
    busca: string,
    filtro?: string[],
    valor?: string[],
  ): Promise<PaginateExercicios | Exercicio[]> {
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
          module: 'exercicio',
          busca,
          pagina,
          itensPorPagina,
          querys,
          orderBy: {
            updatedAt: 'desc',
          },
        });
      } else {
        return await this.prismaService.exercicio.findMany({
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao listar exercicios. ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    const exercicio = await this.prismaService.exercicio.findUnique({
      where: { id },
    });

    if (!exercicio) {
      throw new NotFoundException('Motorista não encontrado na base de dados.');
    }

    return exercicio;
  }

  private async _get(id: string): Promise<CriaExercicioDto> {
    const exercicio = await this.prismaService.exercicio.findUnique({
      where: {
        id,
      },
    });

    if (!exercicio) {
      throw new NotFoundException('Motorista não encontrado na base de dados.');
    }

    return exercicio;
  }




  retornaGifExercicio(gif: string, response: Response): void {
    const gifPath = `./uploads/${process.env.FILE_PATH}`;

    if (!existsSync(gifPath)) {
      throw new NotFoundException(`Imagem não encontrada.`);
    }

    response.sendFile(gif, { root: gifPath });
  }



  async update(
    id: string,
    atualizaExercicioDto: AtualizaExercicioDto,
    gifUrl: Express.Multer.File,
  ) {
    const exercicio = await this._get(id);

    if (gifUrl) {
      this._validateFileSize(gifUrl);
      this._validateFileExtension(gifUrl);
      const nomeDoArquivo = this._generateUniqueFilename(gifUrl);

      await this._removeGifExercicio(exercicio);

      await writeFile(
        join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          'uploads',
          `${process.env.FILE_PATH}/${nomeDoArquivo}`,
        ),
        gifUrl.buffer,
      );

      atualizaExercicioDto.gifUrl = `${this.configService.get<string>(
        'FILE_URL',
      )}${nomeDoArquivo}`;
    }

    try {
      const motorista = await this.prismaService.exercicio.update({
        where: {
          id,
        },
        data: atualizaExercicioDto,
      });

      return motorista;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar motorista.');
    }
  }


  async remove(id: string): Promise<void> {
    const exercicio = await this._get(id);
    await this._removeGifExercicio(exercicio);
  }



  private async _removeGifExercicio(exercicio: CriaExercicioDto): Promise<void> {
    const gifUrl = exercicio.gifUrl
    const nomeDoArquivo = gifUrl.split("/").pop();
    await unlink(
      join(
        __dirname,
        '..', '..', '..', '..',
        'uploads',
        `${process.env.FILE_PATH}/${nomeDoArquivo}`
      )
    );
  }


  private _generateUniqueFilename(gifUrl: Express.Multer.File) {
    const randomName = Date.now() + Math.round(Math.random() * 1e9);
    return `exercicio-${randomName}${extname(gifUrl.originalname)}`;
  }

  private _validateFileExtension(gifUrl: Express.Multer.File) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    if (!allowedExtensions.includes(extname(gifUrl.originalname))) {
      throw new BadRequestException('Extensão de arquivo inválida!');
    }
  }



  private _validateFileSize(gifUrl: Express.Multer.File) {
    try {
      const maxSize = 1024 * 1024 * this.configService.get<number>('MAX_FILE_SIZE');

      if (gifUrl.size > maxSize) {
        throw new ForbiddenException(`Tamanho máximo do gif (${this.configService.get<number>('MAX_FILE_SIZE')}MB) excedido!`);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

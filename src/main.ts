import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from "fs";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const ssl = process.env.SSL === 'true';
  let httpsOptions = null;

  if (ssl) {
    const keyPath = readFileSync(__dirname + '/../../ssl/server.key');
    const certPath = readFileSync(__dirname + '/../../ssl/ssl-bundle.pem');
    httpsOptions = {
      key: keyPath,
      cert: certPath,
    };
  }


  const app = await NestFactory.create<NestExpressApplication>(AppModule, { httpsOptions });

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Modelo Back-end')
    .setDescription('API utilizada como modelo para desenvolvimento do back-end')
    .setVersion('1.0')
    .addTag('Módulos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const HTTP_PORT = config.get<string>('HTTP_PORT');
  const APP_HOSTNAME = config.get<string>('APP_HOSTNAME');
  await app.listen(HTTP_PORT, () => {
    const address =
      'http' + (ssl ? 's' : '') + '://' + APP_HOSTNAME + ':' + HTTP_PORT + '/';
    Logger.log('Listening at ' + address);
  });
}
bootstrap();

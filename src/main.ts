import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Client-API Gateway');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Client API')
    .setDescription('The client API description')
    .setVersion('1.0')
    .addTag('client')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);

  console.log('Hola mundo, primer cambio');

  await app.listen(env.port).then(() => {
    logger.log(`Server is running on port ${env.port}`);
  });
}
bootstrap();

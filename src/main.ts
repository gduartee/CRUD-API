import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ignora campos que não estão no DTO
    forbidNonWhitelisted: true, // lança erro se mandarem campo extra
    transform: true, // transforma payloads em instâncias das classes
  }));

  const config = new DocumentBuilder()
    .setTitle('CRUD Items API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();

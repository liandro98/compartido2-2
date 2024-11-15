import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //configuracion de validation

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  
  //configuracion de swagger

  const config = new DocumentBuilder()
  .setTitle('Sistema Venta API')
  .setDescription('API para el control de un sistemas de vemtas al publico')
  .setVersion('1.0')
  .addTag('api')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document)

  //configuracion de CORS
  app.enableCors();


  await app.listen(3000);
}
bootstrap();

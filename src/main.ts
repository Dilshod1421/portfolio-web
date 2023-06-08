import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function portfolio() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT;
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    const config = new DocumentBuilder()
      .setTitle('Portfolio')
      .setDescription('portfolio api documentation')
      .setVersion('1.0')
      .addTag('nodejs', 'nestjs, typescript')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(PORT, () => console.log('Server running on port', +PORT));
  } catch (error) {
    console.log(error);
  }
}
portfolio();

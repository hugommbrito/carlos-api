import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    always: true,
  }))
  

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Plataforma Carlos Ferreira Team - API')
  .setDescription(
    'Plataforma de gerenciamento de alunos e treinos da equipe Carlos Ferreira Team',
  )
  .addBearerAuth()
  .setVersion('1.0')
  .build();

const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
SwaggerModule.setup('docs', app, swaggerDocument, {
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
  ],
  customCssUrl: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  ],
});

  const appPort: number = Number(process.env.API_PORT) || 3000;
  await app.listen(appPort, () => {
    console.log(`Server is running on port ${appPort}, \n see documentation at http://localhost:${appPort}/docs`);
  });
}
bootstrap();

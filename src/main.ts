import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filters/exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      always: true
    })
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Plataforma Carlos Ferreira Team - API')
    .setDescription('Plataforma de gerenciamento de alunos e treinos da equipe Carlos Ferreira Team')
    .addTag('Usuários', 'Gerencia os usuários da plataforma')
    .addTag('Autenticação')
    // .addTag('Opções de Recompensa', 'Gerencia os possíveis canais para atribuir pontos ao usuário')
    // .addTag('Registros de Recompensas', 'Operações de crédito e débito de pontos dos usuários')
    .addTag('.')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument, {
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js'
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css'
    ]
  });

  const appPort: number = Number(process.env.API_PORT) || 3000;
  await app.listen(appPort, () => {
    console.log(`Server is running on port ${appPort}, \n see documentation at http://localhost:${appPort}/docs`);
  });
}
bootstrap();

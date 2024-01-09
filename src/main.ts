import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appPort: number = Number(process.env.API_PORT) || 3000;
  await app.listen(appPort, () => {
    console.log(`Server is running on port ${appPort}, \n see documentation at http://localhost:${appPort}/docs`);
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import swaggerSetup from './swagger/swaggerSetup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerSetup(app);

  const port = process.env.PORT || 3055;
  await app.listen(port, async () => {
    console.log(
      `Inventory server is running on http://localhost:${port}`,
      `\nSwagger is running on http://localhost:${port}/swagger`,
    );
  });
}
bootstrap();

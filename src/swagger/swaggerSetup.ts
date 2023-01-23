import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';

const swaggerSetup = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Inventory service')
    .addServer(
      `http://localhost:${process.env.PORT || 7050}`,
      'dev local server',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));

  if (process.env.SWAGGER_ONLY) {
    console.log('🚀 Swagger Generated');
    process.exit(0);
  }
};

export default swaggerSetup;

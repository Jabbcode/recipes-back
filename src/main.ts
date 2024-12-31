import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const cortsOptions: CorsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }

  app.enableCors(cortsOptions)

  app.setGlobalPrefix('api/v1')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    autoTagControllers: true,
  }

  const config = new DocumentBuilder()
    .setTitle('Recipes API')
    .setDescription('Api para gestion de recetas')
    .setVersion('1.0')
    .addTag('Recipes')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('api-docs', app, documentFactory)

  await app.listen(process.env.PORT)
}
bootstrap()

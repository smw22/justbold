import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  // Use validation pipe globally with whitelist option to ensure validation on dto fields
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Enable CORS for all origins while in development
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

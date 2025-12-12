/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  // Enable CORS for all origins while in development
  app.enableCors();

  // Add global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in DTO
      forbidNonWhitelisted: true, // Throw error for extra properties
      transform: true, // Auto-transform payloads to DTO instances
    })
  );

  // Reduce logging in production
  if (process.env.NODE_ENV === "production") {
    app.useLogger(["error", "warn"]);
  }

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

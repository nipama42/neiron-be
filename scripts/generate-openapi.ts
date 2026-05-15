/**
 * Генерирует openapi/openapi.json без запуска HTTP-сервера.
 * npm run openapi:generate
 */
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppOpenApiModule } from '../src/app-openapi.module';
import { buildOpenApiDocument } from '../src/swagger/setup-swagger';

async function main() {
  const app = await NestFactory.create(AppOpenApiModule, { logger: false });
  await app.init();

  const document = buildOpenApiDocument(app);
  const outDir = join(__dirname, '..', 'openapi');
  mkdirSync(outDir, { recursive: true });

  const jsonPath = join(outDir, 'openapi.json');
  writeFileSync(jsonPath, JSON.stringify(document, null, 2), 'utf8');

  await app.close();
  console.log(`[openapi] written ${jsonPath} (${Object.keys(document.paths ?? {}).length} paths)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

# neiron-be — Backend API

NestJS-бэкенд для платформы Neiron. Предоставляет REST API для фронтенда и Telegram-бота, управляет пользователями, аутентификацией, каталогом, платёжными операциями и партнёрской программой.

---

## Содержание

- [Архитектура](#архитектура)
- [Технологический стек](#технологический-стек)
- [Быстрый старт (разработка)](#быстрый-старт-разработка)
- [Переменные окружения](#переменные-окружения)
- [Миграции базы данных](#миграции-базы-данных)
- [API-справочник](#api-справочник)
- [Структура проекта](#структура-проекта)
- [Docker](#docker)
- [Тесты](#тесты)

---

## Архитектура

```
neiron-fe  ──HTTP──►  neiron-proxy  ──HTTP──►  neiron-be:3000
neiron-tg-bot  ────────────────────────────────►  PostgreSQL (shared)
```

Бэкенд работает за обратным прокси (neiron-proxy). Прямой доступ по порту `3000` используется только внутри Docker-сети.

---

## Технологический стек

| Слой | Технология |
|------|-----------|
| Фреймворк | NestJS 10 (TypeScript) |
| База данных | PostgreSQL + Sequelize ORM |
| Аутентификация | JWT (access + refresh tokens), Telegram initData HMAC |
| Логирование | pino / nestjs-pino |
| HTTP-сервер | Fastify (через @nestjs/platform-fastify) |
| Документация | Swagger / OpenAPI (в dev-режиме) |
| Контейнеризация | Docker |

---

## Быстрый старт (разработка)

### Требования

- Node.js 20+
- PostgreSQL 15+
- npm

### Установка

```bash
git clone https://github.com/your-org/neiron-be.git
cd neiron-be

npm install

cp .env.example .env
# Отредактируйте .env: DATABASE_URL, JWT_SECRET, BOT_TOKEN
```

### Запуск

```bash
# Применить миграции
psql "$DATABASE_URL" -f migrations/037_bot_login_sessions.sql

# Dev-режим с hot-reload
npm run start:dev

# Production-сборка
npm run build
npm run start:prod
```

Swagger UI доступен по адресу `http://localhost:3000/api` (только в `NODE_ENV=development`).

---

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните:

| Переменная | Обязательная | Описание |
|-----------|:---:|---------|
| `PORT` | — | HTTP-порт сервера (по умолчанию `3000`) |
| `NODE_ENV` | — | `development` / `production` |
| `DATABASE_URL` | ✓ | Строка подключения PostgreSQL |
| `PG_POOL_MAX` | — | Макс. кол-во соединений в пуле (по умолчанию `20`) |
| `JWT_SECRET` | ✓ | Секрет для подписи JWT. **Должен совпадать** с `JWT_SECRET` в `neiron-tg-bot` |
| `CORS_ORIGINS` | ✓ | Разрешённые CORS-origins через запятую (напр. `https://neiron.space`) |
| `BOT_TOKEN` | ✓ | Telegram Bot Token (для верификации `initData`) |
| `PUBLIC_TG_BOT_USERNAME` | ✓ | Юзернейм бота без `@` (для генерации bot-login URL) |
| `BOT_USERNAME` | ✓ | Аналогично `PUBLIC_TG_BOT_USERNAME` (исторически две переменные) |
| `WEB_APP_URL` | ✓ | URL фронтенда (напр. `https://neiron.space`) |

---

## Миграции базы данных

Миграции хранятся в `migrations/` в виде SQL-файлов. Применяются вручную или через CI:

```bash
psql "$DATABASE_URL" -f migrations/037_bot_login_sessions.sql
```

### `037_bot_login_sessions.sql`

Создаёт таблицу `bot_login_sessions` — разделяемое хранилище сессий bot-login flow между `neiron-be` и `neiron-tg-bot`.

| Колонка | Тип | Описание |
|---------|-----|---------|
| `token` | TEXT PK | Уникальный токен сессии (UUID) |
| `partner_slug` | TEXT | Слаг партнёра (если был реферальный deep link) |
| `status` | TEXT | `pending` → `ok` |
| `jwt_token` | TEXT | Access JWT (заполняется ботом после авторизации) |
| `refresh_token` | TEXT | Refresh JWT |
| `user_json` | JSONB | Сериализованный объект пользователя |
| `created_at` | TIMESTAMPTZ | Время создания |
| `expires_at` | TIMESTAMPTZ | TTL 5 минут, индексировано |

---

## API-справочник

### Аутентификация (`/auth`)

| Метод | Путь | Описание |
|-------|------|---------|
| `GET` | `/auth/telegram/bot-login-url` | Генерирует одноразовую ссылку для входа через бота |
| `GET` | `/auth/telegram/bot-login-poll?token=…` | Polling: ожидает завершения bot-login сессии |
| `POST` | `/auth/telegram` | Авторизация через Telegram Web App (`initData`) |
| `POST` | `/auth/token/refresh` | Обновление access/refresh токенов |

#### `POST /auth/telegram` — тело запроса

```json
{
  "initData": "query_id=...&user=...&hash=...",
  "ref": "optional-referral-code"
}
```

#### `POST /auth/token/refresh` — тело запроса

```json
{
  "refreshToken": "eyJ..."
}
```

#### Ответ на успешную авторизацию (оба метода)

```json
{
  "token": "eyJ...",
  "refreshToken": "eyJ...",
  "user": { "id": "uuid", "telegramId": 123456, "username": "...", ... }
}
```

### Прочие модули

| Префикс | Описание |
|---------|---------|
| `/user` | Профиль, баланс, история монет |
| `/catalog` | Каталог AI-продуктов/услуг |
| `/payment` | Платёжные сессии, история транзакций |
| `/partner` | Партнёрская программа, рефералы |
| `/admin` | Административные эндпоинты (требуют роль `admin`) |
| `/health` | Health-check (`200 OK`) |

---

## Структура проекта

```
neiron-be/
├── src/
│   ├── auth/             # JWT, bot-login, Telegram initData
│   │   ├── controllers/
│   │   └── services/
│   │       ├── auth.service.ts
│   │       ├── bot-login.service.ts
│   │       ├── token.service.ts
│   │       └── telegram-verify.service.ts
│   ├── user/             # Пользователи, Telegram-синхронизация
│   ├── catalog/          # Каталог услуг
│   ├── payment/          # Платежи
│   ├── partner/          # Партнёры, рефералы
│   ├── admin/            # Административный модуль
│   ├── health/           # GET /health
│   └── lib/
│       └── auth/models/  # Sequelize-модели (User, Partner, BotLoginSession, …)
├── migrations/           # SQL-миграции
├── Dockerfile
└── .env.example
```

---

## Docker

### Локальная сборка

```bash
docker build -t neiron-be .
docker run -p 3000:3000 --env-file .env neiron-be
```

### В составе стека

Используйте `general-deploy/docker-compose.yml`. Сервис называется `neiron-be`, доступен по имени хоста `neiron-be:3000` внутри Docker-сети `server-network`.

---

## Тесты

```bash
# Unit-тесты
npm run test

# E2E-тесты
npm run test:e2e

# Покрытие
npm run test:cov
```

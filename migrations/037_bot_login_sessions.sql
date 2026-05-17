-- Сессии bot-login: создаются neiron-be, заполняются Python-ботом.
-- После авторизации в боте пользователь автоматически получает JWT без
-- дополнительных шагов на сайте.

CREATE TABLE IF NOT EXISTS bot_login_sessions (
    token        TEXT PRIMARY KEY,
    partner_slug TEXT,
    status       TEXT        NOT NULL DEFAULT 'pending'
                             CHECK (status IN ('pending', 'ok')),
    jwt_token    TEXT,
    refresh_token TEXT,
    user_json    JSONB,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at   TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '5 minutes'
);

CREATE INDEX IF NOT EXISTS idx_bot_login_sessions_expires_at
    ON bot_login_sessions (expires_at);

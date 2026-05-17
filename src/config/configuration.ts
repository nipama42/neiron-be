function normalizeEnv(raw: string | undefined): string {
  const s = String(raw ?? '').trim();
  if (!s || /^(undefined|null)$/i.test(s)) return '';
  return s;
}

function normalizeJwtSecret(raw: string | undefined): string {
  let s = normalizeEnv(raw);
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s || 'dev-secret-change-in-prod';
}

function parseCorsOrigins(): string[] | null {
  const raw = normalizeEnv(process.env.CORS_ORIGINS);
  if (raw) {
    const parts = raw.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts;
  }
  const webApp = normalizeEnv(process.env.WEB_APP_URL);
  if (webApp) {
    try {
      return [new URL(webApp).origin];
    } catch {
      return null;
    }
  }
  return null;
}

export interface DatabaseConfig {
  url: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export function parseDatabaseUrl(url: string): DatabaseConfig {
  const u = new URL(url);
  return {
    url,
    host: u.hostname,
    port: u.port ? Number(u.port) : 5432,
    username: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ''),
  };
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function moderationScore(envName: string, def: number): number {
  const v = Number(process.env[envName]);
  return Number.isFinite(v) ? clamp(v, 0.05, 0.99) : def;
}

export default () => {
  const databaseUrl = normalizeEnv(process.env.DATABASE_URL);
  const db = databaseUrl ? parseDatabaseUrl(databaseUrl) : null;

  const webAppUrl = normalizeEnv(process.env.WEB_APP_URL);
  const kieSunoCallbackUrl = (() => {
    const fromEnv = normalizeEnv(process.env.KIE_SUNO_CALLBACK_URL);
    if (fromEnv) return fromEnv.replace(/\/$/, '');
    const base = (webAppUrl || 'https://neiron.space').replace(/\/$/, '');
    return `${base}/api/kie/suno-callback`;
  })();

  const neuroApiBillingUsageUnit = (() => {
    const v = normalizeEnv(process.env.NEUROAPI_BILLING_USAGE_UNIT).toLowerCase() || 'auto';
    if (v === 'rub' || v === 'cents_usd' || v === 'auto') return v;
    return 'auto';
  })();

  return {
    // ── Core ──────────────────────────────────────────────────────────────────
    port: Number(process.env.PORT || 3000),
    nodeEnv: process.env.NODE_ENV || 'development',
    trustProxy:
      ['1', 'true', 'yes'].includes(
        normalizeEnv(process.env.TRUST_PROXY).toLowerCase(),
      ),
    databaseUrl,
    db,
    pgPoolMax: clamp(Number(process.env.PG_POOL_MAX) || 20, 2, 100),
    jwtSecret: normalizeJwtSecret(process.env.JWT_SECRET),
    corsOrigins: parseCorsOrigins(),
    botToken: normalizeEnv(process.env.BOT_TOKEN),
    botUsername: normalizeEnv(process.env.BOT_USERNAME),
    publicTgBotUsername: normalizeEnv(process.env.PUBLIC_TG_BOT_USERNAME),
    webAppUrl,
    telegraphTermsUrl:
      normalizeEnv(process.env.TELEGRAPH_TERMS_URL) ||
      'https://telegra.ph/Polzovatelskoe-soglashenie--NEIRON-05-03',
    telegraphPrivacyUrl:
      normalizeEnv(process.env.TELEGRAPH_PRIVACY_URL) ||
      'https://telegra.ph/Politika-konfidencialnosti--NEIRON-05-03',
    initialCoins: Number(process.env.INITIAL_COINS) || 20,
    tagChangeCooldownDays: Number(process.env.TAG_CHANGE_COOLDOWN_DAYS) || 7,
    frontendIndexPath: normalizeEnv(process.env.FRONTEND_INDEX_PATH),

    // ── Rate limits ───────────────────────────────────────────────────────────
    authRateLimitWindowMs: Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 900_000,
    authRateLimitMax: Number(process.env.AUTH_RATE_LIMIT_MAX) || 120,
    authEmailCodeWindowMs: Number(process.env.AUTH_EMAIL_CODE_WINDOW_MS) || 3_600_000,
    authEmailCodeMax: Number(process.env.AUTH_EMAIL_CODE_MAX) || 24,
    apiGlobalRateLimitWindowMs: Number(process.env.API_GLOBAL_RATE_LIMIT_WINDOW_MS) || 60_000,
    apiGlobalRateLimitMax: Number(process.env.API_GLOBAL_RATE_LIMIT_MAX) || 800,
    apiHeavyWriteWindowMs: Number(process.env.API_HEAVY_WRITE_WINDOW_MS) || 60_000,
    apiHeavyWriteMax: Number(process.env.API_HEAVY_WRITE_MAX) || 45,
    apiPublicFeedWindowMs: Number(process.env.API_PUBLIC_FEED_WINDOW_MS) || 60_000,
    apiPublicFeedMax: Number(process.env.API_PUBLIC_FEED_MAX) || 150,

    // ── Email / auth ──────────────────────────────────────────────────────────
    emailCodeTtlMinutes: Number(process.env.EMAIL_CODE_TTL_MINUTES) || 10,
    emailCodeResendCooldownSeconds: Number(process.env.EMAIL_CODE_RESEND_COOLDOWN_SECONDS) || 60,
    passwordRecoveryCooldownSeconds: Number(process.env.PASSWORD_RECOVERY_COOLDOWN_SECONDS) || 60,
    emailCodeMaxAttempts: Number(process.env.EMAIL_CODE_MAX_ATTEMPTS) || 5,
    emailVerificationTokenTtlMinutes: Number(process.env.EMAIL_VERIFICATION_TOKEN_TTL_MINUTES) || 15,
    smtpHost: normalizeEnv(process.env.SMTP_HOST),
    smtpPort: Number(process.env.SMTP_PORT) || 587,
    smtpSecure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
    smtpUser: normalizeEnv(process.env.SMTP_USER),
    smtpPass: process.env.SMTP_PASS || '',
    smtpFrom: normalizeEnv(process.env.SMTP_FROM),
    resendApiKey: normalizeEnv(process.env.RESEND_API_KEY),
    resendFrom: normalizeEnv(process.env.RESEND_FROM),

    // ── Admin bootstrap ───────────────────────────────────────────────────────
    adminBossLogin: normalizeEnv(process.env.ADMIN_BOSS_LOGIN),
    adminBossPassword: process.env.ADMIN_BOSS_PASSWORD || '',
    generationApiUnitUsd: Number(process.env.GENERATION_API_UNIT_USD) || 0.02,

    // ── OpenAI / moderation ───────────────────────────────────────────────────
    openAiApiKey: normalizeEnv(process.env.OPENAI_API_KEY),
    openAiProxy: normalizeEnv(process.env.OPENAI_PROXY),
    moderationEnabled: process.env.MODERATION_ENABLED !== 'false',
    moderationAvatarImage: process.env.MODERATION_AVATAR_IMAGE !== 'false',
    moderationTextLenient: process.env.MODERATION_TEXT_LENIENT !== 'false',
    moderationTextScoreMinors: moderationScore('MODERATION_TEXT_SCORE_MINORS', 0.2),
    moderationTextScoreSexual: moderationScore('MODERATION_TEXT_SCORE_SEXUAL', 0.88),
    moderationTextScoreGeneral: moderationScore('MODERATION_TEXT_SCORE_GENERAL', 0.72),

    // ── APIMart ───────────────────────────────────────────────────────────────
    apimartApiKey: normalizeEnv(process.env.APIMART_API_KEY),
    apimartBaseUrl: (normalizeEnv(process.env.APIMART_BASE_URL) || 'https://api.apimart.ai/v1').replace(/\/$/, ''),
    apimartForceAllTraffic:
      normalizeEnv(process.env.APIMART_FORCE_ALL_TRAFFIC).toLowerCase() === 'true',
    apimartMaxConcurrent: clamp(Number(process.env.APIMART_MAX_CONCURRENT) || 40, 1, 300),
    apimartGenerationUnitUsd: Math.max(0, Number(process.env.APIMART_GENERATION_UNIT_USD) || 0.02),

    // ── Kie.ai ────────────────────────────────────────────────────────────────
    kieAiApiKey: normalizeEnv(process.env.KIE_AI_API_KEY),
    kieAiJobsBase: (normalizeEnv(process.env.KIE_AI_JOBS_BASE) || 'https://api.kie.ai').replace(/\/$/, ''),
    kieAiUploadBase: (normalizeEnv(process.env.KIE_AI_UPLOAD_BASE) || 'https://kieai.redpandaai.co').replace(/\/$/, ''),
    kieRateMaxNewTasks: clamp(Number(process.env.KIE_RATE_MAX_NEW_TASKS) || 20, 1, 100),
    kieRateWindowMs: clamp(Number(process.env.KIE_RATE_WINDOW_MS) || 10_000, 1_000, 120_000),
    kieRateMaxWaitMs: clamp(Number(process.env.KIE_RATE_MAX_WAIT_MS) || 180_000, 10_000, 600_000),
    kieMaxConcurrentRequests: clamp(Number(process.env.KIE_MAX_CONCURRENT) || 120, 1, 600),
    /** Одновременных генераций на одного пользователя */
    kieParallelMaxPerUser: clamp(Number(process.env.KIE_PARALLEL_MAX_PER_USER) || 3, 1, 200),
    /** Активных воркеров очереди generation_jobs (все типы вместе) */
    generationQueueMaxActive: clamp(Number(process.env.GENERATION_QUEUE_MAX_ACTIVE) || 80, 1, 200),
    kieSunoCallbackUrl,

    // ── NeuroAPI ──────────────────────────────────────────────────────────────
    get neuroApiKey() {
      const v1 = normalizeEnv(process.env.NEUROAPI_API_KEY);
      return v1 || normalizeEnv(process.env.NEURO_API_KEY);
    },
    neuroApiBaseUrl: (normalizeEnv(process.env.NEUROAPI_BASE_URL) || 'https://neuroapi.host/v1').replace(/\/$/, ''),
    neuroApiMaxConcurrent: clamp(Number(process.env.NEUROAPI_MAX_CONCURRENT) || 20, 1, 200),
    neuroApiTimeoutMs: clamp(Number(process.env.NEUROAPI_TIMEOUT_MS) || 180_000, 60_000, 600_000),
    neuroApiModelImagePro: normalizeEnv(process.env.NEUROAPI_MODEL_IMAGE_PRO) || 'gemini-3-pro-image-preview',
    neuroApiModelImageStd: normalizeEnv(process.env.NEUROAPI_MODEL_IMAGE_STD) || 'gemini-2.5-flash-image',
    neuroApiModelImageStdFlash31: normalizeEnv(process.env.NEUROAPI_MODEL_IMAGE_STD_FLASH31) || 'gemini-3.1-flash-image-preview',
    neuroApiGenerationUnitUsd: Math.max(0, Number(process.env.NEUROAPI_GENERATION_UNIT_USD) || 0.02),
    neuroApiUsageUsdPer1kTokens: Math.max(0, Number(process.env.NEUROAPI_USAGE_USD_PER_1K_TOKENS) || 0),
    neuroApiUsageRubPer1kTokens: Math.max(0, Number(process.env.NEUROAPI_USAGE_RUB_PER_1K_TOKENS) || 0),
    neuroApiBillingUsageUnit,

    // ── Payments ──────────────────────────────────────────────────────────────
    paymentSbpEnabled: ['1', 'true', 'yes'].includes(
      normalizeEnv(process.env.PAYMENT_SBP_ENABLED).toLowerCase(),
    ),
    /** Интервал фонового опроса pending СБП (мс) */
    sbpPollIntervalMs: clamp(Number(process.env.SBP_POLL_INTERVAL_MS) || 30_000, 10_000, 300_000),
    /** Не опрашивать заявки старше N часов; помечать failed */
    sbpPollMaxAgeHours: clamp(Number(process.env.SBP_POLL_MAX_AGE_HOURS) || 48, 1, 168),
    sbpPollBatchSize: clamp(Number(process.env.SBP_POLL_BATCH_SIZE) || 50, 1, 200),
    /** Пауза между запросами к 1Payment (мс) */
    sbpPollGapMs: clamp(Number(process.env.SBP_POLL_GAP_MS) || 250, 0, 5_000),
    onepaymentPartnerId: normalizeEnv(process.env.ONEPAYMENT_PARTNER_ID),
    onepaymentProjectId: normalizeEnv(process.env.ONEPAYMENT_PROJECT_ID),
    onepaymentSecretKey: normalizeEnv(process.env.ONEPAYMENT_SECRET_KEY),
    onepaymentShopUrl: normalizeEnv(process.env.ONEPAYMENT_SHOP_URL),
    onepaymentSuccessUrl: normalizeEnv(process.env.ONEPAYMENT_SUCCESS_URL),
    cryptobotToken: normalizeEnv(process.env.CRYPTOBOT_TOKEN),
    paymentHttpTimeoutMs: Math.max(5_000, Number(process.env.PAYMENT_HTTP_TIMEOUT_MS) || 30_000),

    // ── Spaces (DigitalOcean S3) ──────────────────────────────────────────────
    spacesEnabled: ['1', 'true', 'yes'].includes(
      normalizeEnv(process.env.SPACES_ENABLED).toLowerCase(),
    ),
    spacesEndpoint: normalizeEnv(process.env.SPACES_ENDPOINT),
    spacesRegion: normalizeEnv(process.env.SPACES_REGION),
    spacesBucket: normalizeEnv(process.env.SPACES_BUCKET),
    spacesKey: normalizeEnv(process.env.SPACES_KEY),
    spacesSecret: normalizeEnv(process.env.SPACES_SECRET),
    spacesPublicBaseUrl: normalizeEnv(process.env.SPACES_PUBLIC_BASE_URL),

    // ── Media lifecycle ───────────────────────────────────────────────────────
    mediaLifecycleDelayMs: Number(process.env.MEDIA_LIFECYCLE_DELAY_MS) || 23 * 60 * 60 * 1000,
    mediaPhotoOriginalPreferMs:
      Number(process.env.MEDIA_PHOTO_ORIGINAL_PREFER_MS) || 3 * 24 * 60 * 60 * 1000,

    // ── Outbound HTTP ─────────────────────────────────────────────────────────
    outboundFetchTimeoutMs: Math.max(5_000, Number(process.env.OUTBOUND_FETCH_TIMEOUT_MS) || 60_000),
    outboundFetchMaxRetries: Math.max(0, Number(process.env.OUTBOUND_FETCH_MAX_RETRIES) || 2),
    outboundFetchBackoffMs: Math.max(100, Number(process.env.OUTBOUND_FETCH_BACKOFF_MS) || 1_000),
    outboundFetchKieTimeoutMs: Math.max(5_000, Number(process.env.OUTBOUND_FETCH_KIE_TIMEOUT_MS) || 900_000),
    outboundFetchMediaTimeoutMs: Math.max(5_000, Number(process.env.OUTBOUND_FETCH_MEDIA_TIMEOUT_MS) || 120_000),

    // ── Avatar proxy ──────────────────────────────────────────────────────────
    avatarProxyCacheTtlMs: Number(process.env.AVATAR_PROXY_CACHE_TTL_MS) || 86_400_000,

    // ── Paths ─────────────────────────────────────────────────────────────────
    paths: {
      avatars: normalizeEnv(process.env.AVATAR_DIR),
      media: normalizeEnv(process.env.MEDIA_DIR),
      supportMedia: normalizeEnv(process.env.SUPPORT_MEDIA_DIR),
    },
  };
};

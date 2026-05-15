import { User } from './models/user.model';

export function userFromModel(row: User | null) {
  if (!row) return null;
  return {
    id: row.id,
    createdAt: (row as { createdAt?: Date }).createdAt ?? (row as { created_at?: Date }).created_at,
    updatedAt: (row as { updatedAt?: Date }).updatedAt ?? (row as { updated_at?: Date }).updated_at,
    email: row.email,
    login: row.login,
    emailVerifiedAt: row.email_verified_at,
    passwordHash: row.password_hash,
    telegramId: row.telegram_id,
    telegramUsername: row.telegram_username,
    telegramFirstName: row.telegram_first_name,
    registrationChannel: row.registration_channel,
    coinsBalance: row.coins_balance,
    hasCompletedFirstGeneration: row.has_completed_first_generation,
    firstGenerationAt: row.first_generation_at,
    hasCompletedFirstPurchase: row.has_completed_first_purchase,
    firstPurchaseAt: row.first_purchase_at,
    purchasesCount: row.purchases_count,
    referralCode: row.referral_code,
    referredByUserId: row.referred_by_user_id,
    referralSource: row.referral_source,
    partnerId: row.partner_id,
    publicTag: row.public_tag,
    tagChangedAt: row.tag_changed_at,
    profilePublic: row.profile_public,
    shareByDefault: row.share_by_default,
    bio: row.bio,
    instagramUrl: row.instagram_url,
    telegramUrl: row.telegram_url,
    tiktokUrl: row.tiktok_url,
    twitterUrl: row.twitter_url,
    youtubeUrl: row.youtube_url,
    vkUrl: row.vk_url,
    ledger: row.ledger,
    publicPortfolio: row.public_portfolio,
    usedPromoCodes: row.used_promo_codes,
    rouletteLastSpinAt: row.roulette_last_spin_at,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    subscriptionTier: row.subscription_tier,
    profileLikesCount: row.profile_likes_count,
    generationsLog: row.generations_log,
    publicGenerations: row.public_generations,
    likedPublicGenerations: row.liked_public_generations,
    isAdmin: Boolean(row.is_admin),
    activeGenerationUntil: row.active_generation_until ?? null,
    kieParallelLocks: row.kie_parallel_locks ?? [],
    telegramRefInviterBonusAwardedAt: row.telegram_ref_inviter_bonus_awarded_at ?? null,
  };
}

export function hydrateUserDates<T extends Record<string, unknown>>(row: T | null) {
  if (!row) return null;
  return {
    ...row,
    ledger: Array.isArray(row.ledger) ? row.ledger : [],
    publicPortfolio: Array.isArray(row.publicPortfolio) ? row.publicPortfolio : [],
    usedPromoCodes: Array.isArray(row.usedPromoCodes) ? row.usedPromoCodes : [],
    generationsLog: Array.isArray(row.generationsLog) ? row.generationsLog : [],
    publicGenerations: Array.isArray(row.publicGenerations) ? row.publicGenerations : [],
    likedPublicGenerations: Array.isArray(row.likedPublicGenerations)
      ? row.likedPublicGenerations
      : [],
    rouletteLastSpinAt: row.rouletteLastSpinAt
      ? new Date(row.rouletteLastSpinAt as string | Date)
      : null,
    createdAt: row.createdAt ? new Date(row.createdAt as string | Date) : new Date(),
    updatedAt: row.updatedAt ? new Date(row.updatedAt as string | Date) : new Date(),
    emailVerifiedAt: row.emailVerifiedAt
      ? new Date(row.emailVerifiedAt as string | Date)
      : null,
    firstGenerationAt: row.firstGenerationAt
      ? new Date(row.firstGenerationAt as string | Date)
      : null,
    firstPurchaseAt: row.firstPurchaseAt
      ? new Date(row.firstPurchaseAt as string | Date)
      : null,
    tagChangedAt: row.tagChangedAt ? new Date(row.tagChangedAt as string | Date) : null,
    activeGenerationUntil: row.activeGenerationUntil
      ? new Date(row.activeGenerationUntil as string | Date)
      : null,
    kieParallelLocks: Array.isArray(row.kieParallelLocks) ? row.kieParallelLocks : [],
  };
}

export function toAuthUserDto(user: ReturnType<typeof hydrateUserDates>) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    login: user.login,
    telegramId: user.telegramId,
    telegramUsername: user.telegramUsername,
    telegramFirstName: user.telegramFirstName,
    registrationChannel: user.registrationChannel,
    coinsBalance: user.coinsBalance,
    referralCode: user.referralCode,
    publicTag: user.publicTag,
    profilePublic: user.profilePublic,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    isAdmin: user.isAdmin,
  };
}

export function toProfileDto(user: ReturnType<typeof hydrateUserDates>) {
  if (!user) return null;
  return {
    id: user.id,
    publicTag: user.publicTag,
    profilePublic: user.profilePublic,
    shareByDefault: user.shareByDefault,
    bio: user.bio,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    instagramUrl: user.instagramUrl,
    telegramUrl: user.telegramUrl,
    tiktokUrl: user.tiktokUrl,
    twitterUrl: user.twitterUrl,
    youtubeUrl: user.youtubeUrl,
    vkUrl: user.vkUrl,
    profileLikesCount: user.profileLikesCount,
    subscriptionTier: user.subscriptionTier,
    referralCode: user.referralCode,
    coinsBalance: user.coinsBalance,
  };
}

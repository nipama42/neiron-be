import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'users', underscored: true, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' })
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  declare email: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare email_verified_at: Date | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare password_hash: string | null;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  declare telegram_id: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare telegram_username: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare telegram_first_name: string | null;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'EMAIL' })
  declare registration_channel: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare coins_balance: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare has_completed_first_generation: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  declare first_generation_at: Date | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare has_completed_first_purchase: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  declare first_purchase_at: Date | null;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare purchases_count: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare referral_code: string;

  @Column({ type: DataType.UUID, allowNull: true })
  declare referred_by_user_id: string | null;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'ORGANIC' })
  declare referral_source: string;

  @Column({ type: DataType.UUID, allowNull: true })
  declare partner_id: string | null;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  declare public_tag: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare tag_changed_at: Date | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare profile_public: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare share_by_default: boolean;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare bio: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare instagram_url: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare telegram_url: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare tiktok_url: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare twitter_url: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare youtube_url: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare vk_url: string | null;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  declare ledger: unknown;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  declare public_portfolio: unknown;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  declare used_promo_codes: unknown;

  @Column({ type: DataType.DATE, allowNull: true })
  declare roulette_last_spin_at: Date | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare login: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare display_name: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare avatar_url: string | null;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'free' })
  declare subscription_tier: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare profile_likes_count: number;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  declare generations_log: unknown;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  declare public_generations: unknown;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  declare liked_public_generations: unknown;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare is_admin: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  declare active_generation_until: Date | null;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  declare kie_parallel_locks: unknown;

  @Column({ type: DataType.DATE, allowNull: true })
  declare support_closed_at: Date | null;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  declare chat_paid_mode_day: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare telegram_ref_inviter_bonus_awarded_at: Date | null;
}

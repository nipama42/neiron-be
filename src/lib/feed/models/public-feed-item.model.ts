import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'public_feed_items',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class PublicFeedItem extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare author_user_id: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare likes: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'photo' })
  declare mode: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  declare model_id: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  declare model_label: string;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  declare prompt_preview: string;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  declare prompt: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare aspect: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare quality: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare duration: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare music_title: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare cost: number | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare result_url: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare result_display_url: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare result_main_url: string | null;

  @Column({ type: DataType.JSONB, allowNull: true })
  declare media: unknown;

  @Column({ type: DataType.DATE, allowNull: true })
  declare published_at: Date | null;
}

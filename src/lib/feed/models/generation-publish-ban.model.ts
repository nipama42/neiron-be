import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'generation_publish_bans', underscored: true, timestamps: false })
export class GenerationPublishBan extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare generation_id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare author_user_id: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare created_at: Date;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'photo' })
  declare mode: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  declare model_label: string;

  @Column({ type: DataType.TEXT, allowNull: false, defaultValue: '' })
  declare prompt_preview: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare result_thumb_url: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare admin_dismissed_at: Date | null;
}

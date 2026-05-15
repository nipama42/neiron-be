import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'models', underscored: true, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' })
export class GenerationModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  declare label: string;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: ['photo'] })
  declare modes: unknown;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare show_duration: boolean;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  declare aspect_ratios: unknown;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  declare quality_opts: unknown;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  declare media_max_files: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'image/*' })
  declare media_accept: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 15 })
  declare media_max_size_mb: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  declare media_hint: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare sort_order: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  declare is_active: boolean;
}

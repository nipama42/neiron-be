import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'site_events', underscored: true, timestamps: false })
export class SiteEvent extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare kind: string;

  @Column({ type: DataType.UUID, allowNull: true })
  declare user_id: string | null;

  @Column({ type: DataType.STRING, allowNull: false })
  declare label: string;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: {} })
  declare meta: unknown;

  @Column({ type: DataType.DATE, allowNull: false })
  declare created_at: Date;
}

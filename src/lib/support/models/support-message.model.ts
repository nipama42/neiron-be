import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'support_messages', underscored: true, timestamps: false })
export class SupportMessage extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare user_id: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare is_from_admin: boolean;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare body: string;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  declare attachments: unknown;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare read_by_admin: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare read_by_user: boolean;

  @Column({ type: DataType.DATE, allowNull: false })
  declare created_at: Date;
}

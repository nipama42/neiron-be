import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'partner_earnings', underscored: true, timestamps: false })
export class PartnerEarning extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare partner_id: string;

  @Column({ type: DataType.UUID, allowNull: true })
  declare source_user_id: string | null;

  @Column({ type: DataType.DECIMAL(12, 4), allowNull: false })
  declare amount_usd: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'direct' })
  declare kind: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare credits_bought: number;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 })
  declare price_rub: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare created_at: Date;
}

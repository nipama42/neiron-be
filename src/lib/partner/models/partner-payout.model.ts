import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'partner_payouts', underscored: true, timestamps: false })
export class PartnerPayout extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare partner_id: string;

  @Column({ type: DataType.DECIMAL(12, 4), allowNull: false })
  declare amount_usd: string;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true })
  declare amount_rub: string | null;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'pending' })
  declare status: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare requested_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare processed_at: Date | null;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare admin_notes: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare payout_trc20_address: string | null;
}

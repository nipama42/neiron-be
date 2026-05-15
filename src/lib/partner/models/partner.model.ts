import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'partners', underscored: true, timestamps: false })
export class Partner extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare slug: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.UUID, allowNull: true })
  declare user_id: string | null;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare partner_code: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'active' })
  declare status: string;

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: false, defaultValue: 20 })
  declare commission_percent: string;

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: false, defaultValue: 5 })
  declare sub_upline_percent: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'rub' })
  declare display_currency: string;

  @Column({ type: DataType.DECIMAL(12, 4), allowNull: false, defaultValue: 0 })
  declare available_usd: string;

  @Column({ type: DataType.DECIMAL(12, 4), allowNull: false, defaultValue: 0 })
  declare total_earned_usd: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare payout_trc20_address: string | null;
}

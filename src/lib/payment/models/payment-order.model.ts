import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'payment_orders',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class PaymentOrder extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare user_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare package_id: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare credits: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare amount_rub: number;

  @Column({ type: DataType.DECIMAL(12, 6), allowNull: true })
  declare amount_usdt: string | null;

  @Column({ type: DataType.STRING, allowNull: false })
  declare method: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'pending' })
  declare status: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare external_id: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare pay_url: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare paid_at: Date | null;
}

import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'kie_economics_settings', underscored: true, timestamps: false })
export class KieEconomicsSettings extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.DECIMAL(12, 8), allowNull: false })
  declare kie_token_usd: string;

  @Column({ type: DataType.DECIMAL(12, 4), allowNull: false })
  declare usd_rub_rate: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'kie' })
  declare photo_provider_mode: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare updated_at: Date | null;
}

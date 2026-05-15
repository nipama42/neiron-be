import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'kie_video_model_prices', underscored: true, timestamps: false })
export class KieVideoModelPrice extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare model_id: string;

  @PrimaryKey
  @Column(DataType.STRING)
  declare tier_key: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare coins: number;

  @Column({ type: DataType.DATE, allowNull: true })
  declare updated_at: Date | null;
}

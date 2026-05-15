import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'promo_codes', underscored: true, timestamps: false })
export class PromoCode extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare code: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare credits: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare max_uses: number | null;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare uses_count: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  declare active: boolean;

  @Column({ type: DataType.DATE, allowNull: false })
  declare created_at: Date;
}

import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'banners', underscored: true, timestamps: false })
export class Banner extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare slot: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare image_url: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare link_url: string | null;

  @Column({ type: DataType.DATE, allowNull: false })
  declare updated_at: Date;
}

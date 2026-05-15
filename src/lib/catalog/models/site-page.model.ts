import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'site_pages', underscored: true, timestamps: false })
export class SitePage extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare page_key: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare body_html: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare updated_at: Date;
}

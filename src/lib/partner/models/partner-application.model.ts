import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'partner_applications', underscored: true, timestamps: false })
export class PartnerApplication extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false, unique: true })
  declare user_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare contact: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string | null;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'pending' })
  declare status: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare applied_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare reviewed_at: Date | null;
}

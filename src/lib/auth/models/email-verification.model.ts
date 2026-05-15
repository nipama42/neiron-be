import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'email_verifications', underscored: true, timestamps: false })
export class EmailVerification extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare code_hash: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare attempts: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare expires_at: string;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare resend_not_before_at: string;

  @Column({ type: DataType.BIGINT, allowNull: true })
  declare verified_at: string | null;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare updated_at: string;
}

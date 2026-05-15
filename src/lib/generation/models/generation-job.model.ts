import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'generation_jobs',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class GenerationJob extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare user_id: string;

  @Column({ type: DataType.UUID, allowNull: false, unique: true })
  declare generation_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare job_kind: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  declare payload: unknown;

  @Column({ type: DataType.STRING, allowNull: false })
  declare lock_id: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'pending' })
  declare state: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare error: string | null;
}

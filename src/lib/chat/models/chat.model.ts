import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'chats',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Chat extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare user_id: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'Новый чат' })
  declare title: string;
}

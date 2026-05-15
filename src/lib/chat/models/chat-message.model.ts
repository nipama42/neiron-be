import { Column, DataType, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'chat_messages', underscored: true, timestamps: false })
export class ChatMessage extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare chat_id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare role: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare user_image_count: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare created_at: Date;
}

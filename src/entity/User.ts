import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  personId: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  password: string;
  
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  regDate: Date;
}
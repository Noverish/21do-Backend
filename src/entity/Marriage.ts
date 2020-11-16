import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from ".";

@Entity()
export default class Marriage extends BaseEntity {
  @PrimaryGeneratedColumn()
  marriageId: number;
  
  @OneToOne(() => Person)
  @JoinColumn()
  male: Person;

  @OneToOne(() => Person)
  @JoinColumn()
  lady: Person;

  @Column()
  location: string;

  @Column()
  account: string;

  @Column()
  bank: string;
}
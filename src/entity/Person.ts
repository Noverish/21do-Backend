import { BaseEntity, Column, Entity, FindConditions, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  personId: number;

  @Column()
  name: string;
  
  @Column("char", { length: 11 })
  phone: string;

  static async getOrCreateIfNotExist(phone: string, name: string) {
    const person = await Person.findOne({ phone });
    if (person) {
      return person;
    } else {
      const inserResult = await Person.insert({ name, phone });
      const personId = inserResult.identifiers[0].personId;
      return await Person.findOne(personId);
    }
  }
}
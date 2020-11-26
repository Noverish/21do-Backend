import { MarriageDTO } from "@src/models";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Marriage extends BaseEntity {
  @PrimaryGeneratedColumn()
  marriageId: number;
  
  @Column({ nullable: true })
  maleName?: string;

  @Column({ nullable: true })
  malePhone?: string;

  @Column({ nullable: true })
  ladyName?: string;

  @Column({ nullable: true })
  ladyPhone?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  account?: string;

  @Column({ nullable: true })
  bank?: string;

  async toDTO(): Promise<MarriageDTO> {
    return {
      marriageId: this.marriageId,
      maleName: this.maleName || undefined,
      malePhone: this.malePhone || undefined,
      ladyName: this.ladyName || undefined,
      ladyPhone: this.ladyPhone || undefined,
      location: this.location || undefined,
      account: this.account || undefined,
      bank: this.bank || undefined,
    }
  }
}

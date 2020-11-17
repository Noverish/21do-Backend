import { MarriageDTO } from "@src/models";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from ".";

@Entity()
export default class Marriage extends BaseEntity {
  @PrimaryGeneratedColumn()
  marriageId: number;
  
  @Column()
  maleUserId: number;

  @Column()
  ladyUserId: number;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  account?: string;

  @Column({ nullable: true })
  bank?: string;

  async toDTO(): Promise<MarriageDTO> {
    return {
      marriageId: this.marriageId,
      male: await (await User.findOne(this.maleUserId)).toDTO(),
      lady: await (await User.findOne(this.ladyUserId)).toDTO(),
      location: this.location || undefined,
      account: this.account || undefined,
      bank: this.bank || undefined,
    }
  }
}

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsMarriageAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(marriageId: any, args: ValidationArguments) {
    return Marriage.findOne(marriageId).then(marriage => !!marriage);
  }

  defaultMessage(args: ValidationArguments) {
    return 'No such marriage';
  }
}

export function IsMarriageExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMarriageAlreadyExistConstraint,
    });
  };
}
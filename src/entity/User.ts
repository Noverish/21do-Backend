import { UserDTO } from "@src/models";
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ nullable: true })
  @Index({ unique: true })
  username?: string;

  @Column({ nullable: true })
  password?: string;
  
  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  phone?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  addDate: Date;

  @Column({ nullable: true })
  regDate?: Date;

  async toDTO(): Promise<UserDTO> {
    return {
      userId: this.userId,
      username: this.username || undefined,
      name: this.name || undefined,
      phone: this.phone || undefined,
      addDate: this.addDate.toISOString(),
      regDate: this.regDate?.toISOString(),
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
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
  async validate(userId: any, args: ValidationArguments) {
    return User.findOne(userId).then(user => !!user);
  }

  defaultMessage(args: ValidationArguments) {
    return 'No such user';
  }
}

export function IsUserExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
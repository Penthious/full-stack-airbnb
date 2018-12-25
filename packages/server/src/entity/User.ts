import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { hash } from "bcryptjs";

import { Listing } from "./Listing";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("boolean", { default: false })
  accountLocked: boolean;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Column("varchar", { length: 255, nullable: true })
  email: string;

  @Column("text") password: string;

  @Column("text", { nullable: true })
  twitterId: string;

  @OneToMany(() => Listing, listing => listing.user)
  listings: Listing[];

  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @BeforeInsert()
  async preSave() {
    await this.hashPassword();
  }

  @BeforeUpdate()
  async preUpdate() {
    await this.hashPassword();
  }
}

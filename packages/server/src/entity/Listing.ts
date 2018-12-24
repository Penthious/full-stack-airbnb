import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("listing")
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;
  @Column("varchar", { length: 255 }) name: string;
  @Column("text") pictureUrl: string;
  @Column("varchar", { length: 255 }) description: string;
  @Column("double precision") price: number;
  @Column("double precision") latitude: number;
  @Column("double precision") longitude: number;
  @Column("int") beds: number;
  @Column("int") guests: number;
  @Column("text", { array: true }) amenities: string[];
}

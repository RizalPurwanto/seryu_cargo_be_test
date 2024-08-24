import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Drivers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  driver_code: string;

  @Column()
  name: string;
}

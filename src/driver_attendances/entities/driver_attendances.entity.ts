import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class DriverAttendances {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  driver_code: string;

  @Column()
  attendance_date: Date;

  @Column()
  attendance_status: boolean;
}

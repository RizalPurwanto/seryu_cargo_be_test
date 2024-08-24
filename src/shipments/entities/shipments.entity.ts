import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Shipments {
  @PrimaryGeneratedColumn()
  shipment_no: string;

  @Column()
  shipment_date: Date;

  @Column()
  shipment_status: string;
}

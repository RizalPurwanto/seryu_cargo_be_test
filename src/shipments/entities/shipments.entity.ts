import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Shipments {
  @PrimaryColumn()
  shipment_no: string;

  @Column()
  shipment_date: Date;

  @Column()
  shipment_status: string;
}

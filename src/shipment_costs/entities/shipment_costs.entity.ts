import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class ShipmentCosts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  driver_code: string;

  @Column()
  shipment_no: string;

  @Column()
  total_costs: number;

  @Column()
  cost_status: string;
}

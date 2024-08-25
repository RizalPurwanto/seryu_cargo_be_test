import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class VariableConfigs {
  @PrimaryColumn()
  key: string;

  @Column()
  value: number;
}

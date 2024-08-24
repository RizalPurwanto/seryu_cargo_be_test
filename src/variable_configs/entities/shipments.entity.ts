import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class VariableConfigs {
  @PrimaryGeneratedColumn()
  key: string;

  @Column()
  value: number;
}

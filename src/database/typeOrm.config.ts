import { DriverAttendances } from 'src/driver_attendances/entities/driver_attendances.entity';
import { Drivers } from 'src/drivers/entities/drivers.entity';
import { Migration1724498796044 } from 'src/migrations/1724498796044-migration';
import { Migration1724498925316 } from 'src/migrations/1724498925316-migration';
import { Migration1724499151877 } from 'src/migrations/1724499151877-migration';
import { Migration1724499210150 } from 'src/migrations/1724499210150-migration';
import { Migration1724499644971 } from 'src/migrations/1724499644971-migration';
import { ShipmentCosts } from 'src/shipment_costs/entities/shipment_costs.entity';
import { Shipments } from 'src/shipments/entities/shipments.entity';
import { VariableConfigs } from 'src/variable_configs/entities/variable_configs.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'seryu_db',
  entities: [
    Drivers,
    DriverAttendances,
    Shipments,
    ShipmentCosts,
    VariableConfigs,
  ],
  migrations: [
    Migration1724498796044,
    Migration1724498925316,
    Migration1724499151877,
    Migration1724499210150,
    Migration1724499644971,
  ],
});

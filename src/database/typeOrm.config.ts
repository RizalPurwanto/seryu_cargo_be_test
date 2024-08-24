import { DriverAttendances } from 'src/driver_attendances/entities/driver_attendances.entity';
import { Drivers } from 'src/drivers/entities/drivers.entity';
import { ShipmentCosts } from 'src/shipment_costs/entities/shipment_costs.entity';
import { Shipments } from 'src/shipments/entities/shipments.entity';
import { VariableConfigs } from 'src/variable_configs/entities/shipments.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'seryu_admin',
  password: 'seryu_password_123',
  database: 'seryu_db',
  entities: [
    Drivers,
    DriverAttendances,
    Shipments,
    ShipmentCosts,
    VariableConfigs,
  ],
  migrations: [],
});

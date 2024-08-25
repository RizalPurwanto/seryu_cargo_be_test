import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversModule } from './drivers/drivers.module';
import { DriverAttendancesModule } from './driver_attendances/driver_attendances.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { ShipmentCostsModule } from './shipment_costs/shipment_costs.module';
import { VariableConfigsModule } from './variable_configs/variable_configs.module';

@Module({
  imports: [
    DriversModule,
    DriverAttendancesModule,
    ShipmentsModule,
    ShipmentCostsModule,
    VariableConfigsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

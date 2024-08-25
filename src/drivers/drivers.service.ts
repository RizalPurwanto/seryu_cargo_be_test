import { BadRequestException, Injectable } from '@nestjs/common';
import myDataSource from 'src/config/ormconfig';

@Injectable()
export class DriversService {
  constructor() {}
  async onModuleInit() {
    if (!myDataSource.isInitialized) {
      await myDataSource.initialize();
    }
  }

  async findAll(query: any): Promise<any> {
    if (!query.month || !query.year) {
      throw new BadRequestException(`Invalid Date`);
    }

    if (query.month < 0 || query.month > 12) {
      throw new BadRequestException(`Invalid Date`);
    }
    const driverShipmentsSubquery = await myDataSource
      .createQueryBuilder()
      .select('shipment_costs.driver_code', 'driver_code')
      .addSelect('drivers.name', 'name')
      .addSelect('COUNT(DISTINCT shipments.shipment_no)', 'count_shipment')
      .addSelect(
        `
        SUM(CASE WHEN shipment_costs.cost_status = 'PENDING' THEN shipment_costs.total_costs ELSE 0 END)
    `,
        'total_pending',
      )
      .addSelect(
        `
        SUM(CASE WHEN shipment_costs.cost_status = 'CONFIRMED' THEN shipment_costs.total_costs ELSE 0 END)
    `,
        'total_confirmed',
      )
      .addSelect(
        `
        SUM(CASE WHEN shipment_costs.cost_status = 'PAID' THEN shipment_costs.total_costs ELSE 0 END)
    `,
        'total_paid',
      )
      .from('shipment_costs', 'shipment_costs')
      .leftJoin(
        'drivers',
        'drivers',
        'shipment_costs.driver_code = drivers.driver_code',
      )
      .leftJoin(
        'shipments',
        'shipments',
        'shipments.shipment_no = shipment_costs.shipment_no',
      )
      .where('shipments.shipment_status != :cancelled', {
        cancelled: 'CANCELLED',
      })
      .andWhere('EXTRACT(MONTH FROM shipments.shipment_date) = :month', {
        month: query.month,
      })
      .andWhere('EXTRACT(YEAR FROM shipments.shipment_date) = :year', {
        month: query.year,
      })
      .groupBy('shipment_costs.driver_code')
      .addGroupBy('drivers.name')
      .orderBy('shipment_costs.driver_code');

    const attendancesListSubquery = await myDataSource
      .createQueryBuilder()
      .select('driver_attendances.driver_code', 'driver_code')
      .addSelect('COUNT(*)', 'total_attendances')
      .addSelect(
        `
        SUM(CASE 
            WHEN driver_attendances.attendance_status = true 
            AND EXTRACT(MONTH FROM driver_attendances.attendance_date) = ${query.month}
            AND EXTRACT(YEAR FROM driver_attendances.attendance_date) =  ${query.year} 
            THEN (SELECT value FROM variable_configs WHERE variable_configs.key = 'DRIVER_MONTHLY_ATTENDANCE_SALARY') 
            ELSE 0 
        END)
    `,
        'total_attendance_salary',
      )
      .from('driver_attendances', 'driver_attendances')
      .where(
        'EXTRACT(MONTH FROM driver_attendances.attendance_date) = :month',
        { month: query.month },
      )
      .andWhere(
        'EXTRACT(YEAR FROM driver_attendances.attendance_date) = :year',
        { year: query.year },
      )
      .andWhere('driver_attendances.attendance_status = true')
      .groupBy('driver_attendances.driver_code');

    const result = await myDataSource
      .createQueryBuilder()
      .select('driver_shipments.driver_code', 'driver_code')
      .addSelect('driver_shipments.name', 'name')
      .addSelect('driver_shipments.count_shipment', 'count_shipment')
      .addSelect('driver_shipments.total_pending', 'total_pending')
      .addSelect('driver_shipments.total_confirmed', 'total_confirmed')
      .addSelect('driver_shipments.total_paid', 'total_paid')
      .addSelect('attendances_list.total_attendances', 'total_attendances')
      .addSelect(
        'attendances_list.total_attendance_salary',
        'total_attendance_salary',
      )
      .addSelect(
        `
      (driver_shipments.total_pending + driver_shipments.total_confirmed + driver_shipments.total_paid + attendances_list.total_attendance_salary)
    `,
        'total_salary',
      )
      .from(`(${driverShipmentsSubquery.getQuery()})`, 'driver_shipments')
      .innerJoin(
        `(${attendancesListSubquery.getQuery()})`,
        'attendances_list',
        'attendances_list.driver_code = driver_shipments.driver_code',
      )
      .setParameters(driverShipmentsSubquery.getParameters())
      .setParameters(attendancesListSubquery.getParameters())
      .getRawMany();

    return result;
  }
}

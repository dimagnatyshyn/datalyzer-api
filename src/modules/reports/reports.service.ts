import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionManagerService } from '../connections/connection-manager.service';
import { ModelsService } from '../models/models.service';
import { ReportsRepositoryService } from './reports-repository.service';
import { UpdateReportDto } from './dto/updateReport.dto';
import { CreateReportDto } from './dto/createReport.dto';
import { getManager } from 'typeorm';
import { separateFactsAndDimensionFields } from './utils';
import { DashboardService } from '../dashboard/dashboard.service';

@Injectable()
export class ReportsService {
  constructor(
    private modelsService: ModelsService,
    private dashboardService: DashboardService,
    private connectionManager: ConnectionManagerService,
    private reportsRepositoryService: ReportsRepositoryService,
  ) {}

  async getReportData(id: number) {
    const report = await this.reportsRepositoryService.findById(id, {
      relations: ['report_items', 'report_items.model_item_field'],
    });
    const { report_items: items } = report;
    const itemsData = await this.getFieldValues(items.map(_ => _.model_item_field_id));
    const { facts, dimensions } = separateFactsAndDimensionFields(items);
    return {
      ...report,
      report_items: itemsData,
      facts,
      dimensions,
    };
  }

  async getFieldValues(data: number[]) {
    const fields = await this.modelsService.getModelItemsFieldsData(data);
    const [firstItem, secondItem] = fields;
    const fact = firstItem.type === 'fact' ? firstItem : secondItem;
    const dimension = firstItem.type === 'dimension' ? firstItem : secondItem;
    const connectionId = await this.modelsService.getConnectionIdByModelItemFieldId(firstItem.id);
    if (!connectionId) {
      throw new HttpException({
        error: 'Error with connection',
      }, HttpStatus.BAD_REQUEST);
    }
    const connection = await this.connectionManager.getConnection(connectionId);
    const queryBuilder = connection.createQueryBuilder();
    if (firstItem.model_item.id === secondItem.model_item.id) {
      queryBuilder
        .select([
          `${dimension.original_name} as ${dimension.given_name}`,
          `AVG(${fact.original_name}) as ${fact.given_name}`,
        ])
        .from(dimension.model_item.table_name, 'table')
        .groupBy(`${dimension.original_name}`);
    } else {
      const {
        first_model_item_relation_field: firstTableRelField,
        second_model_item_relation_field: secondTableRelField,
        first_model_item_id: firstModelItemRelId,
        second_model_item_id: secondModelItemRelId,
      } = await this.modelsService.getRelationData(firstItem.model_item.id, secondItem.model_item.id);

      const {
        given_name: fNameGiven,
        original_name: fName,
        model_item: { table_name: fTable },
      } = firstModelItemRelId === firstItem.model_item.id ? firstItem : secondItem;

      const {
        given_name: sNameGiven,
        original_name: sName,
        model_item: { table_name: sTable },
      } = secondModelItemRelId === secondItem.model_item.id ? secondItem : firstItem;

      queryBuilder
        .from(fTable, 'table')
        .innerJoin(sTable, 'secondTable', `"table".${firstTableRelField} = "secondTable".${secondTableRelField}`)

      if (fName === dimension.original_name) {
        queryBuilder
          .select([`"table".${fName} as ${fNameGiven}`, `SUM("secondTable".${sName}) as ${sNameGiven}`])
          .groupBy(`"table".${fName}`);
      } else {
        queryBuilder
          .select([`SUM("table".${fName}) as ${fNameGiven}`, `"secondTable".${sName} as ${sNameGiven}`])
          .groupBy(`"secondTable".${sName}`);
      }
    }
    return queryBuilder.getRawMany();
  }

  deleteReport(report: number, user: number) {
    return this.reportsRepositoryService.delete({ id: report, user_id: user });
  }

  async updateReportData(report: number, data: UpdateReportDto, user: number) {
    await this.reportsRepositoryService.update({ id: report, user_id: user }, data);
    return this.reportsRepositoryService.findOne({ id: report, user_id: user });
  }

  async createReport(data: CreateReportDto, user: number) {
    return getManager().transaction(async manager => {
      let dashboard = data.dashboard;
      if (data.newDashboardName) {
        const newDashboard = await this.dashboardService.createDashboard({ name: data.newDashboardName }, user);
        dashboard = newDashboard.id;
      }
      const report = await this.reportsRepositoryService.createReport({ ...data, dashboard, user, manager });
      const reportItems = await Promise.all(
        data.modelItems.map((modelItemField) => (
          this.reportsRepositoryService.createReportItem({ modelItemField, report: report.id, manager })),
        ),
      );
      return {
        ...report,
        report_items: reportItems,
      };
    });
  }
}

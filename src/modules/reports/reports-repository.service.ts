import { Inject, Injectable } from '@nestjs/common';
import { REPORT_REPOSITORY, REPORT_ITEM_REPOSITORY } from '../../constants';
import { Repository } from 'typeorm';
import Report from '../database/entities/report.entity';
import BaseRepositoryService from '../../base/baseRepository.service';
import ReportItem from '../database/entities/report-item.entity';

@Injectable()
export class ReportsRepositoryService extends BaseRepositoryService<Report> {
  constructor(
    @Inject(REPORT_REPOSITORY)
    private readonly reportRepository: Repository<Report>,
    @Inject(REPORT_ITEM_REPOSITORY)
    private readonly reportItemsRepository: Repository<ReportItem>,
  ) {
    super(reportRepository);
  }

  createReport({ name, dashboard, user, type, manager }) {
    const report = new Report();
    report.dashboard_id = dashboard;
    report.name = name;
    report.user_id = user;
    report.report_type_id = type;
    return manager.save(report);
  }

  createReportItem({ report, modelItemField, manager }) {
    const reportItem = new ReportItem();
    reportItem.report_id = report;
    reportItem.model_item_field_id = modelItemField;
    return manager.save(reportItem);
  }
}

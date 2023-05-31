import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DataForNewReportDto } from './dto/dataForNewReport.dto';
import { ReportsService } from './reports.service';
import { ModelDataItemFieldResponseObject } from './response-objects/model-data-item-field-response-object';
import { AuthGuard } from '@nestjs/passport';
import { IdDto } from '../shared/dto/id.dto';
import { CreateReportDto } from './dto/createReport.dto';
import { UpdateReportDto } from './dto/updateReport.dto';
import { DeleteResponseObject } from '../shared/response-objects/delete.response-object';
import { ReportResponseObject } from './response-objects/report.response-object';
import { ReportUpdateResponseObject } from './response-objects/report-update.response-object';
import { ReportDataResponseObject } from './response-objects/report-data.response-object';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: ReportDataResponseObject })
  @UseGuards(AuthGuard('user'))
  @Get(':id')
  getReport(@Param() { id }: IdDto) {
    return this.reportsService.getReportData(id);
  }

  @ApiCreatedResponse({ type: [ModelDataItemFieldResponseObject]})
  @ApiBearerAuth()
  @UseGuards(AuthGuard('user'))
  @Get('data')
  getDataForNewReport(@Query() data: DataForNewReportDto) {
    return this.reportsService.getFieldValues(data.modelItemFieldId);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReportResponseObject })
  @UseGuards(AuthGuard('user'))
  @Post()
  create(@Body() data: CreateReportDto, @Request() { user }) {
    return this.reportsService.createReport(data, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ReportUpdateResponseObject })
  @UseGuards(AuthGuard('user'))
  @Put(':id')
  update(@Param() { id }: IdDto, @Body() data: UpdateReportDto, @Request() { user }) {
    return this.reportsService.updateReportData(id, data, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteResponseObject })
  @UseGuards(AuthGuard('user'))
  @Delete(':id')
  remove(@Param() { id }: IdDto, @Request() { user }) {
    return this.reportsService.deleteReport(id, user.id);
  }
}

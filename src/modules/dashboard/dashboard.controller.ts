import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';
import { SearchDto } from '../shared/dto/searchDto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IdDto } from '../shared/dto/id.dto';
import { DeleteResponseObject } from '../shared/response-objects/delete.response-object';
import { DashboardResponseObject } from './response-objects/dashboard.response-object';
import { DashboardCreateDto } from './dto/dashboardCreate.dto';
import { DashboardDetailsResponseObject } from './response-objects/dashboard-details.response-object';

@ApiTags('dashboards')
@Controller('dashboards')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: DashboardDetailsResponseObject })
  @UseGuards(AuthGuard('user'))
  @Get(':id')
  getOne(@Param() { id }: IdDto, @Request() { user }) {
    return this.dashboardService.getDashboardDetails(id, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [DashboardResponseObject] })
  @UseGuards(AuthGuard('user'))
  @Get()
  getAll(@Query() { page, itemsPerPage, search }: SearchDto, @Request() { user }) {
    return this.dashboardService.getDashboards(page, itemsPerPage, search, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: DashboardResponseObject })
  @UseGuards(AuthGuard('user'))
  @Post()
  create(@Body() data: DashboardCreateDto, @Request() { user }) {
    return this.dashboardService.createDashboard(data, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteResponseObject })
  @UseGuards(AuthGuard('user'))
  @Delete(':id')
  delete(@Param() { id }: IdDto, @Request() { user }) {
    return this.dashboardService.deleteDashboard(id, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: DashboardResponseObject })
  @UseGuards(AuthGuard('user'))
  @Put(':id')
  update(@Param() { id }: IdDto, @Body() data: DashboardCreateDto, @Request() { user }) {
    return this.dashboardService.changeDashboardName(id, data.name, user.id);
  }
}

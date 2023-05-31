import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Body, Controller, Get, Query, Post, Request, UseGuards, Delete, Param, Put } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ModelsService} from './models.service';
import {ModelsCountResponseObject} from './response-objects/models-count-response-object';
import { CreateModelDto } from './dto/createModel.dto';
import { ModelDetailsResponseObject } from './response-objects/model-details-response-object';
import {SearchDto} from '../shared/dto/searchDto';
import { IdDto } from '../shared/dto/id.dto';
import { DeleteResponseObject } from '../shared/response-objects/delete.response-object';
import ModelForReportResponseObject from './response-objects/model-for-report.response-object';
import { RenameModelDto } from './dto/renameModel.dto';

@ApiTags('models')
@Controller('models')
export class ModelsController {
  constructor(
    private modelsService: ModelsService,
  ) {}

  @ApiCreatedResponse({ type: ModelDetailsResponseObject })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('user'))
  @Get()
  getAll(@Query() { page, itemsPerPage, search }: SearchDto, @Request() { user }) {
    return this.modelsService.getModelsList(
      page,
      itemsPerPage,
      search,
      user.id,
      user.user_type_id === 1,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [ModelForReportResponseObject] })
  @UseGuards(AuthGuard('user'))
  @Get('report')
  getModelsForReport(@Request() { user }) {
    return this.modelsService.getModelsDataForReport(user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Delete(':id')
  deleteModel(@Param() { id }: IdDto) {
    return this.modelsService.deleteModel(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ModelsCountResponseObject })
  @UseGuards(AuthGuard('user'))
  @Get('count')
  getCount(@Request() { user }) {
    return this.modelsService.getModelsCount(user);
  }

  @ApiCreatedResponse({ type: ModelDetailsResponseObject })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin'))
  @Post()
  create(@Body() data: CreateModelDto, @Request() { user }) {
    return this.modelsService.createModel(data, user.id);
  }

  @ApiCreatedResponse({ type: ModelDetailsResponseObject })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin'))
  @Put(':id')
  rename(@Param() { id }: IdDto, @Body() data: RenameModelDto) {
    return this.modelsService.renameModel(data, id);
  }
}

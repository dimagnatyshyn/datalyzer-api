import {Body, Controller, Post, UseGuards, Request, Get, Query, Param, Delete, Put} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {CreateConnectionDto} from './dto/createConnection.dto';
import {ConnectionsService} from './connections.service';
import { SearchDto } from '../shared/dto/searchDto';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {ConnectionResponseObject} from './response-objects/connection-response-object';
import {ConnectionTablesResponseObject} from './response-objects/connection-tables-response-object';
import {ConnectionsCountResponseObject} from './response-objects/connections-count-response-object';
import { ConnectionRelationsResponseObject } from './response-objects/connection-relations-response-object';
import { IdDto } from '../shared/dto/id.dto';
import { DeleteResponseObject } from '../shared/response-objects/delete.response-object';
import {UpdateConnectionDto} from './dto/updateConnection.dto';

@ApiTags('connections')
@Controller('connections')
export class ConnectionsController {
  constructor(
    private connectionsService: ConnectionsService,
  ) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ConnectionResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Post()
  create(@Body() data: CreateConnectionDto, @Request() { user }) {
    return this.connectionsService.createNewConnection(data, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Delete(':id')
  delete(@Param() { id }: IdDto) {
    return this.connectionsService.deleteConnection(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ConnectionResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Put(':id')
  update(@Param() { id }: IdDto, @Body() data: UpdateConnectionDto) {
    return this.connectionsService.updateConnection(id, data);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [ConnectionResponseObject] })
  @UseGuards(AuthGuard('admin'))
  @Get()
  getAll(@Query() { page, itemsPerPage, search }: SearchDto, @Request() { user }) {
    return this.connectionsService.getConnectionsList(page, itemsPerPage, search, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ConnectionsCountResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Get('count')
  getCount(@Request() { user }) {
    return this.connectionsService.getConnectionsCount(user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [ConnectionTablesResponseObject] })
  @UseGuards(AuthGuard('admin'))
  @Get(':id/tables')
  getDescription(@Param() { id }: IdDto) {
    return this.connectionsService.getConnectionTables(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [ConnectionRelationsResponseObject] })
  @UseGuards(AuthGuard('admin'))
  @Get(':id/relations')
  getRelations(@Param() { id }: IdDto) {
    return this.connectionsService.getConnectionRelations(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('user'))
  @Get(':id/check')
  checkIfReachable(@Param() { id }: IdDto) {
    return this.connectionsService.isReachable(id);
  }
}

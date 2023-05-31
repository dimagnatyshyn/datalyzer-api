import { Controller, Get, Post, Body, Request, UseGuards, Query, Put, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateDto from './dto/create.dto';
import { SearchDto } from '../shared/dto/searchDto';
import { AuthGuard } from '@nestjs/passport';
import { NewPasswordDto } from './dto/newPassword.dto';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {UserResponseObject} from './response-objects/user-response-object';
import {UserCountResponseObject} from './response-objects/user-count-response-object';
import { IdDto } from '../shared/dto/id.dto';
import { DeleteResponseObject } from '../shared/response-objects/delete.response-object';
import { QueryDto } from './dto/query.dto';
import UpdateUserDto from './dto/updateUser.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Post()
  create(@Body() createDto: CreateDto, @Request() req) {
    return this.usersService.create(createDto, req.user.id);
  }

  @ApiOkResponse({ type: DeleteResponseObject })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin'))
  @Delete(':id')
  delete(@Param() { id }: IdDto, @Request() req) {
    return this.usersService.deleteUser(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [UserResponseObject] })
  @UseGuards(AuthGuard('admin'))
  @Get()
  findAll(@Query() { page, itemsPerPage, search }: SearchDto, @Request() req) {
    return this.usersService.getUserList(page, itemsPerPage, search, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserCountResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Get('count')
  getCount(@Query() { search }: QueryDto, @Request() { user }) {
    return this.usersService.getUsersCount(user.id, search);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponseObject})
  @UseGuards(AuthGuard('user'))
  @Get('/me')
  getUserData(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [UserResponseObject] })
  @UseGuards(AuthGuard('admin'))
  @Get('/admins')
  async getAdmins() {
    return await this.usersService.getUsersByType('admin');
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponseObject })
  @UseGuards(AuthGuard('user'))
  @Put('/change-password')
  changePassword(@Body() newPasswordDto: NewPasswordDto, @Request() { user }) {
    return this.usersService.changePassword(newPasswordDto, user.id);
  }

  @ApiOkResponse({ type: UserResponseObject })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin'))
  @Put(':id')
  update(@Param() { id }: IdDto, @Body() data: UpdateUserDto) {
    return this.usersService.updateUser(id, data);
  }
}

import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {ApiTags, ApiBody, ApiOkResponse} from '@nestjs/swagger';
import {LoginDto} from './dto/login.dto';
import {LoginResponseObject} from './response-objects/login-response-object';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: LoginResponseObject })
  @ApiBody({ type: LoginDto })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

import { Body, Controller, Post, Session } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';

import { CreateUserDTO } from './dtos/create-user.dto';
import { UserDTO } from './dtos/user.dto';

import { UsersService } from './users.service';

@Serialize(UserDTO)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.usersService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.usersService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }
}

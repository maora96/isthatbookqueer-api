import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserDTO } from './dtos/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDTO)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    return this.usersService.signup(body.email, body.password);
  }

  @Post('signin')
  signin(@Body() body: CreateUserDTO) {
    return this.usersService.signin(body.email, body.password);
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(email: string, password: string) {
    const existingUser = this.usersRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ForbiddenException('User with this email already exists.');
    }
    const user = this.usersRepository.create({ email, password });

    return this.usersRepository.save(user);
  }

  // async update(id: number, attrs: Partial<User>) {
  //   const existingUser = await this.usersRepository.findOne({ where: { id } });

  //   if (!existingUser) {
  //     throw new NotFoundException('User not found.');
  //   }

  //   Object.assign(existingUser, attrs);

  //   return this.usersRepository.save(existingUser);
  // }

  // async remove(id: number) {
  //   const existingUser = await this.usersRepository.findOne({ where: { id } });

  //   if (!existingUser) {
  //     throw new NotFoundException('User not found.');
  //   }

  //   return this.usersRepository.remove(existingUser);
  // }
}

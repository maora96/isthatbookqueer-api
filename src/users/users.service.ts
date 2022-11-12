import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async signup(email: string, password: string) {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = this.usersRepository.create({ email, password: result });

    return this.usersRepository.save(user);
  }

  async signin(email: string, password: string) {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (!existingUser) {
      throw new NotFoundException('User with this email already exists.');
    }

    const [salt, storedHash] = existingUser.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Email or password incorrect.');
    }

    return existingUser;
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

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const encryptedPassword = await hash(createUserDto.password, 10);

    const userCreated = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: encryptedPassword,
      },
    });

    return userCreated;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if(updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 10);
    }
    
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

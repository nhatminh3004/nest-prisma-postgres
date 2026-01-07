/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable no-empty */
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma } from '@prisma/client';
import { Role } from '@prisma/client';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    console.log('body: ', dto);

    const email = dto.email.toLowerCase().trim();
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Theo yêu cầu: nếu pass khớp -> ADMIN, không thì USER
    const adminCode = process.env.ADMIN_CREATE_CODE ?? 'Minh@123';
    const role: Role = dto.pass === adminCode ? Role.ADMIN : Role.USER;
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          name: dto.name?.trim(),
          passwordHash,
          role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      return user;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException('Email đã tồn tại');
      }
    }
  }

  findAll() {
    return 'helsosss';
  }
}

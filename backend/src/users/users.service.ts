import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  // Mock veri yapısı
  private users = [];

  create(createUserDto: CreateUserDto) {
    const user = {
      id: Math.random().toString(36).substring(2, 15),
      ...createUserDto,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  findByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        ...updateUserDto,
        updatedAt: new Date()
      };
      return this.users[index];
    }
    return null;
  }

  remove(id: string) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      const deletedUser = this.users[index];
      this.users.splice(index, 1);
      return deletedUser;
    }
    return null;
  }

  updatePassword(id: string, password: string) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index].password = password;
      this.users[index].passwordResetToken = null;
      this.users[index].passwordResetExpires = null;
      this.users[index].updatedAt = new Date();
      return this.users[index];
    }
    return null;
  }
} 
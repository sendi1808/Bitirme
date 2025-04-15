import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni kullanıcı oluştur' })
  @ApiResponse({ status: 201, description: 'Kullanıcı başarıyla oluşturuldu.' })
  @ApiResponse({ status: 400, description: 'Geçersiz giriş verileri' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Tüm kullanıcıları listele' })
  @ApiResponse({ status: 200, description: 'Kullanıcıların listesi başarıyla alındı.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID ile kullanıcı bul' })
  @ApiResponse({ status: 200, description: 'Kullanıcı başarıyla bulundu.' })
  @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Kullanıcıyı güncelle' })
  @ApiResponse({ status: 200, description: 'Kullanıcı başarıyla güncellendi.' })
  @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kullanıcıyı sil' })
  @ApiResponse({ status: 200, description: 'Kullanıcı başarıyla silindi.' })
  @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
} 
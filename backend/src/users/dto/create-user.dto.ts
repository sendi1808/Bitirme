import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'doktor@spinova.com', description: 'Kullanıcı e-posta adresi' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Parola123!', description: 'Kullanıcı parolası' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Parola en az 8 karakter olmalıdır' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Parola en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir',
  })
  password: string;

  @ApiProperty({ example: 'Ali', description: 'İsim', required: false })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Yılmaz', description: 'Soyisim', required: false })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'doctor', description: 'Kullanıcı rolü', required: false })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ example: '12345', description: 'Kullanıcı sicil numarası', required: false })
  @IsString()
  @IsNotEmpty()
  sicilNo: string;
} 
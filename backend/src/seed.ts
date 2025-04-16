import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Test doktoru oluştur
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  // Önce User oluşturuyoruz
  const user = await prisma.user.create({
    data: {
      email: 'doktor@test.com',
      password: hashedPassword,
      role: 'doctor'
    }
  });
  
  // Sonra Doctor oluşturuyoruz
  const doctor = await prisma.doctor.create({
    data: {
      userId: user.id,
      name: 'Test',
      surname: 'Doktor',
      registrationNo: '12345',
      hospital: 'Test Hastanesi',
      email: 'doktor@test.com',
      password: hashedPassword,
      isEmailVerified: true,
      isPasswordChanged: true
    }
  });

  console.log({ doctor });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
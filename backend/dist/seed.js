"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword = await bcrypt.hash('123456', 10);
    const user = await prisma.user.create({
        data: {
            email: 'doktor@test.com',
            password: hashedPassword,
            role: 'doctor'
        }
    });
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
//# sourceMappingURL=seed.js.map
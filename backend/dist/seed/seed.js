"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword = await bcrypt.hash('123456', 10);
    const admin = await prisma.admin.create({
        data: {
            name: 'Admin',
            surname: 'User',
            email: 'admin@spinova.com',
            password: hashedPassword,
            userId: 'admin-user'
        }
    });
    const doctor = await prisma.doctor.create({
        data: {
            name: 'John',
            surname: 'Doe',
            registrationNo: '12345678901',
            hospital: 'Spinova Hospital',
            email: 'doctor@spinova.com',
            password: hashedPassword,
            userId: 'doctor-user'
        }
    });
    const patient = await prisma.patient.create({
        data: {
            name: 'Jane',
            surname: 'Smith',
            tcNo: '98765432109',
            birthDate: new Date('1990-01-01'),
            gender: 'female',
            phone: '+905551234567',
            email: 'patient@spinova.com',
            address: 'Istanbul, Turkey',
            bloodType: 'A+',
            height: 170,
            weight: 65,
            allergies: 'None',
            chronicDiseases: 'None',
            doctorId: doctor.id,
            userId: 'patient-user'
        }
    });
    console.log({ admin, doctor, patient });
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
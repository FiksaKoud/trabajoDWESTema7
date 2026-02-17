import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // 1. Clean data
    await prisma.viajePasajero.deleteMany({})
    await prisma.viaje.deleteMany({})
    await prisma.conductor.deleteMany({})
    await prisma.pasajero.deleteMany({})
    await prisma.user.deleteMany({})

    // 2. Create ADMIN User
    const adminPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@transporte.com',
            password: adminPassword,
            role: 'ADMIN',
        },
    })
    console.log('Admin user created:', admin.email)

    // 3. Create Conductores
    const c1 = await prisma.conductor.create({ data: { nombre: 'Juan Pérez', telefono: '600111222' } })
    const c2 = await prisma.conductor.create({ data: { nombre: 'Ana López', telefono: '611222333' } })

    // 4. Create Pasajeros
    const p1 = await prisma.pasajero.create({ data: { nombre: 'Luis Gomis', bonobus: true } })
    const p2 = await prisma.pasajero.create({ data: { nombre: 'Marta Ruz', bonobus: false } })

    // 5. Create Viajes
    const v1 = await prisma.viaje.create({
        data: {
            fecha_hora: new Date(),
            origen: 'Granada',
            destino: 'Málaga',
            precio_billete: 15.50,
            conductor_id: c1.id,
        },
    })

    // 6. Associate Pasajeros to Viajes
    await prisma.viajePasajero.create({
        data: {
            viaje_id: v1.id,
            pasajero_id: p1.id,
        },
    })

    console.log('Seeding complete.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

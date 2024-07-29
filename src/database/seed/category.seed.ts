import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

    const book = await prisma.category.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Books'
        }
    })

    const fashion = await prisma.category.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Fashion'
        }
    })

    const health = await prisma.category.upsert({
        where: { id: 3 },
        update: {},
        create: {
            name: 'Health & Beauty'
        }
    })

    const home = await prisma.category.upsert({
        where: { id: 4 },
        update: {},
        create: {
            name: 'Home & Garden'
        }
    })

    const sporta = await prisma.category.upsert({
        where: { id: 5 },
        update: {},
        create: {
            name: 'Sport & Outdoors'
        }
    })

    const tecnology = await prisma.category.upsert({
        where: { id: 6 },
        update: {},
        create: {
            name: 'Tecnology & Electronics'
        }
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
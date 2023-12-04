import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const custumer = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      username: 'user',
      password: '$2b$10$iDy0.3AA8A26u37KlK5QheX9iwb5UrV51r44FbPtCo4BvTbBIG.Re',
    },
  });

  console.log({ custumer });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

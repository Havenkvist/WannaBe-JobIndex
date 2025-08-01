import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const company = await prisma.user.create({
    data: {
      name: "TechCorp",
      email: "hr@techcorp.com",
      username: "techcorp_hr",
      passwordHash,   // Hashet password
      role: Role.COMPANY,
    },
  });

  await prisma.job.createMany({
    data: [
      {
        title: "Junior Frontend Developer",
        description: "Work with React and TypeScript.",
        company: "TechCorp",
        location: "Remote",
        userId: company.id,
      },
      {
        title: "Graduate Backend Developer",
        description: "Build APIs with Node.js.",
        company: "TechCorp",
        location: "Copenhagen",
        userId: company.id,
      },
    ],
  });

  console.log("✅ Seeded database with company and jobs");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

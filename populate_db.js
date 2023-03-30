import readline from "readline";
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const fileStream = fs.createReadStream("ruc1.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const [cedula, nombre, digito_verif, rfc, estado] = line.split("|");

    await prisma.contribuyente.create({
      data: {
        cedula,
        nombre,
        digito_verif: parseInt(digito_verif),
        rfc,
        estado,
      },
    });
  }

  console.log("Datos migrados exitosamente!");
  await prisma.$disconnect();
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

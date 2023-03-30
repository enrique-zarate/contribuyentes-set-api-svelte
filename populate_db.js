import readline from "readline";
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const fileStream = fs.createReadStream("ruc5.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const contribuyentes = [];
  for await (const line of rl) {
    const [cedula, nombre, digito_verif, rfc, estado] = line.split("|");
    contribuyentes.push({
      cedula,
      nombre,
      digito_verif: parseInt(digito_verif),
      rfc,
      estado,
    });
  }

  await prisma.contribuyente.createMany({
    data: contribuyentes,
  });

  console.log("Datos migrados exitosamente!");
  await prisma.$disconnect();
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

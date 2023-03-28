// This is a server route, not a page route
import { json } from "@sveltejs/kit";
// we're going to use Prisma to connect to our database and work with our data
import { PrismaClient } from "@prisma/client";

// We'll create a new instance of the PrismaClient class
const prisma = new PrismaClient();
// We'll import the Prisma model 'Contribuyente' so we can use it in our route
// import Contribuyente from "$lib/models/Contribuyente";

// First, we'll create a function that handles the GET request and returns  the Contribuyentes objects in the database by using the findMany() method and searching by 'cedula'
// export async function GET() {
//   const contribuyentes = await prisma.contribuyente.findMany({
//     // filter by cedula equals 1000460 (just for testing)
//     where: {
//       cedula: {
//         equals: "1000460",
//       },
//     },
//   });
//   // Then, we'll return the contribuyentes as JSON
//   return json(contribuyentes);
// }

// Next, we'll create a function that returns a single Contribuyente object by using the findUnique() method and searching by 'cedula'
export async function GET({ url }) {
  const ced = url.searchParams.get("cedu");
  console.log(ced);
  // console.log(url.searchParams.get("cedu"));
  // console.log(params);

  // Find the one Contribuyente object that matches the cedula
  const contribuyentes = await prisma.contribuyente.findUnique({
    where: {
      cedula: ced,
    },
  });
  // Then, we'll return the contribuyentes as JSON
  return json(contribuyentes);
}

// test URL with para

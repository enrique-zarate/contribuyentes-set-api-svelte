// This is a server route, not a page route
import { json } from "@sveltejs/kit";
// we're going to use Prisma to connect to our database and work with our data
import { PrismaClient } from "@prisma/client";
// we'll use the error from sveltekit
import { error } from "@sveltejs/kit";

// We'll create a new instance of the PrismaClient class
const prisma = new PrismaClient();
// We'll import the Prisma model 'Contribuyente' so we can use it in our route
// import Contribuyente from "$lib/models/Contribuyente";

// First, we'll create a function that returns a single Contribuyente object by using the findUnique() method and searching by 'cedula' and 'digito_verif'
export async function GET({ url }) {
  console.log("HOLA");
  console.log(url.searchParams);
  const ced = url.searchParams.get("cedula");
  // parse digito_verif to an integer
  const dig = parseInt(url.searchParams.get("digito"));

  try {
    // Using the AND operator, find the one Contribuyente object that matches the cedula and digito_verif
    const contribuyente = await prisma.contribuyente.findUnique({
      where: {
        cedula_digito_verif: {
          cedula: ced,
          digito_verif: dig,
        },
      },
    });
    // If the Contribuyente object is found, return it as JSON
    if (contribuyente) {
      return json(contribuyente);
    }
    // If the Contribuyente object is not found, return a 404 error
    else {
      return json({ error: "Contribuyente no encontrado" });
    }
  } catch (e) {
    console.log(e);
    throw error(500, "Error al buscar contribuyente");
  }
}

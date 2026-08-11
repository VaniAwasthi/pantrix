import { PrismaClient } from "@prisma/client";
import { getUniqueIndianRecipes } from "./data/indianRecipes";

const prisma = new PrismaClient();

async function main() {
  const recipes = getUniqueIndianRecipes();
  console.log(`Seeding ${recipes.length} Indian recipes...`);

  await prisma.recipe.deleteMany();

  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        mealType: recipe.mealType,
        cuisine: "indian",
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        ingredients: JSON.stringify(recipe.ingredients),
        instructions: JSON.stringify(recipe.instructions),
        tags: JSON.stringify(recipe.tags),
      },
    });
  }

  console.log(`Seeded ${recipes.length} Indian recipes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

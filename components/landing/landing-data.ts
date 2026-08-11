export const landingNavLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#recipes", label: "Recipes" },
] as const;

export const howItWorksSteps = [
  {
    step: "01",
    title: "Add your groceries",
    description:
      "Log what is already in your kitchen — fresh produce, staples, and leftovers waiting for a second chance.",
  },
  {
    step: "02",
    title: "Let AI think",
    description:
      "Pantrix reads your pantry, watches expiry dates, and matches dishes you can cook tonight with zero missing ingredients.",
  },
  {
    step: "03",
    title: "Cook something great",
    description:
      "Pick a recipe, use what you have, and build a shopping list only for the gaps that matter.",
  },
] as const;

export const smartFeatures = [
  {
    title: "Expiry tracking",
    description:
      "See what is fresh, what is fading, and what needs cooking soon — before food becomes waste.",
  },
  {
    title: "AI recipe recommendations",
    description:
      "Get meal ideas ranked by what you already own, not by an endless grocery wishlist.",
  },
  {
    title: "Smart shopping lists",
    description:
      "Fill only the gaps. Pantrix turns missing ingredients into a calm, focused list.",
  },
  {
    title: "Nutrition tracking",
    description:
      "Understand the balance of your meals as you cook — protein, greens, and everyday nourishment.",
  },
] as const;

export const demoPantryItems = [
  { name: "Tomato", qty: "400g", status: "fresh" as const },
  { name: "Onion", qty: "250g", status: "fresh" as const },
  { name: "Paneer", qty: "200g", status: "expiring" as const },
  { name: "Spinach", qty: "150g", status: "expiring" as const },
  { name: "Rice", qty: "1 kg", status: "fresh" as const },
  { name: "Cumin", qty: "1 packet", status: "fresh" as const },
] as const;

export const demoRecipes = [
  {
    title: "Palak Paneer",
    match: "100% match",
    uses: "Uses expiring spinach & paneer",
  },
  {
    title: "Jeera Rice Bowl",
    match: "Ready now",
    uses: "Simple sides from staples",
  },
  {
    title: "Tomato Onion Tadka",
    match: "Quick dinner",
    uses: "15-minute comfort cook",
  },
] as const;

export const mockKitchenPreview = {
  pantryCount: 18,
  expiringSoon: 3,
  recipeMatches: 7,
  nutritionScore: "82",
  shoppingItems: ["Curd", "Garlic", "Atta"],
  expiring: [
    { name: "Paneer", days: "Tomorrow" },
    { name: "Spinach", days: "2 days" },
    { name: "Milk", days: "3 days" },
  ],
  recipes: [
    { title: "Palak Paneer", tag: "Dinner" },
    { title: "Dal Tadka", tag: "Lunch" },
    { title: "Jeera Rice", tag: "Side" },
  ],
} as const;

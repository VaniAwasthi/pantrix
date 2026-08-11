export type MealFilter =
  | "all"
  | "breakfast"
  | "lunch"
  | "dinner"
  | "snacks"
  | "dessert";

export type RecipeDifficulty = "Easy" | "Medium" | "Hard";

export interface MockRecipe {
  id: string;
  title: string;
  imageGradient: string;
  matchPercent: number;
  rating: number;
  cookTimeMin: number;
  difficulty: RecipeDifficulty;
  calories: number;
  cuisine: string;
  mealType: Exclude<MealFilter, "all">;
  have: string[];
  missing: string[];
  favourite?: boolean;
  usesExpiring?: string;
  healthy?: boolean;
}

export const mealFilters: { id: MealFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snacks", label: "Snacks" },
  { id: "dessert", label: "Dessert" },
];

export const extraFilters = [
  "Cooking time",
  "Cuisine",
  "Diet",
  "Calories",
  "Difficulty",
  "Match %",
] as const;

export const cravingExamples = [
  "Something quick and spicy",
  "High protein dinner",
  "Use my potatoes",
  "Something under 30 minutes",
];

export const mockRecipes: MockRecipe[] = [
  {
    id: "aloo-jeera",
    title: "Aloo Jeera",
    imageGradient: "from-amber-200 via-orange-300 to-amber-600",
    matchPercent: 96,
    rating: 4.8,
    cookTimeMin: 20,
    difficulty: "Easy",
    calories: 240,
    cuisine: "Indian",
    mealType: "lunch",
    have: ["Potato", "Cumin", "Onion"],
    missing: [],
    favourite: false,
  },
  {
    id: "palak-paneer",
    title: "Palak Paneer",
    imageGradient: "from-emerald-200 via-green-400 to-emerald-800",
    matchPercent: 89,
    rating: 4.7,
    cookTimeMin: 35,
    difficulty: "Medium",
    calories: 320,
    cuisine: "Indian",
    mealType: "dinner",
    have: ["Spinach", "Paneer", "Onion", "Garlic", "Ghee", "Cumin", "Salt", "Tomato"],
    missing: ["Cream"],
    usesExpiring: "Spinach expires in 2 days",
    favourite: true,
  },
  {
    id: "dal-tadka",
    title: "Dal Tadka",
    imageGradient: "from-yellow-200 via-amber-400 to-orange-700",
    matchPercent: 100,
    rating: 4.9,
    cookTimeMin: 30,
    difficulty: "Easy",
    calories: 280,
    cuisine: "Indian",
    mealType: "lunch",
    have: ["Dal", "Onion", "Tomato", "Cumin", "Turmeric", "Ghee", "Rice"],
    missing: [],
  },
  {
    id: "paneer-butter",
    title: "Paneer Butter Masala",
    imageGradient: "from-orange-200 via-rose-300 to-red-700",
    matchPercent: 82,
    rating: 4.6,
    cookTimeMin: 40,
    difficulty: "Medium",
    calories: 410,
    cuisine: "Indian",
    mealType: "dinner",
    have: ["Paneer", "Tomato", "Onion", "Butter"],
    missing: ["Cream", "Cashews"],
  },
  {
    id: "masala-omelette",
    title: "Masala Omelette",
    imageGradient: "from-yellow-100 via-amber-200 to-yellow-500",
    matchPercent: 94,
    rating: 4.5,
    cookTimeMin: 10,
    difficulty: "Easy",
    calories: 190,
    cuisine: "Indian",
    mealType: "breakfast",
    have: ["Eggs", "Onion", "Tomato", "Green Chilli"],
    missing: [],
    healthy: true,
  },
  {
    id: "veg-fried-rice",
    title: "Veg Fried Rice",
    imageGradient: "from-lime-100 via-emerald-200 to-teal-600",
    matchPercent: 78,
    rating: 4.3,
    cookTimeMin: 25,
    difficulty: "Easy",
    calories: 350,
    cuisine: "Asian",
    mealType: "dinner",
    have: ["Rice", "Carrot", "Onion"],
    missing: ["Beans", "Soy Sauce"],
  },
  {
    id: "poha",
    title: "Kanda Poha",
    imageGradient: "from-yellow-50 via-amber-100 to-yellow-400",
    matchPercent: 91,
    rating: 4.4,
    cookTimeMin: 15,
    difficulty: "Easy",
    calories: 220,
    cuisine: "Indian",
    mealType: "breakfast",
    have: ["Poha", "Onion", "Potato", "Peanut"],
    missing: [],
    healthy: true,
  },
  {
    id: "fruit-chaat",
    title: "Fruit Chaat",
    imageGradient: "from-pink-100 via-rose-200 to-fuchsia-500",
    matchPercent: 88,
    rating: 4.2,
    cookTimeMin: 10,
    difficulty: "Easy",
    calories: 150,
    cuisine: "Indian",
    mealType: "snacks",
    have: ["Apple", "Banana", "Lemon"],
    missing: ["Chaat Masala"],
    healthy: true,
  },
];

export const aiPick = {
  reasonTitle: "Use your spinach before it expires.",
  recipeTitle: "Palak Paneer",
  reason:
    "Your spinach expires in 2 days and you already have 8 of 9 ingredients.",
  recipeId: "palak-paneer",
};

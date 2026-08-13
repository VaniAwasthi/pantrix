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
  instructions: string[];
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

export type CookingTimeFilter = "any" | "under-15" | "15-30" | "30-60";
export type DietFilter =
  | "any"
  | "vegetarian"
  | "vegan"
  | "eggetarian"
  | "non-vegetarian";
export type CalorieFilter = "any" | "under-200" | "under-300" | "under-400";
export type MatchPercentFilter = "any" | "70" | "80" | "90" | "100";
export type DifficultyFilter = "any" | RecipeDifficulty;
export type CuisineFilter = "any" | "indian" | "asian";

export type RecipeExtraFilters = {
  cookingTime: CookingTimeFilter;
  cuisine: CuisineFilter;
  diet: DietFilter;
  calories: CalorieFilter;
  difficulty: DifficultyFilter;
  matchPercent: MatchPercentFilter;
};

export const defaultExtraFilters: RecipeExtraFilters = {
  cookingTime: "any",
  cuisine: "any",
  diet: "any",
  calories: "any",
  difficulty: "any",
  matchPercent: "any",
};

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
    instructions: [
      "Peel and cube the potatoes. Slice the onion.",
      "Heat oil, add cumin until it splutters, then fry onion until golden.",
      "Add potatoes, salt, and a pinch of turmeric. Cover and cook until tender.",
      "Finish with coriander if you have it, and serve hot.",
    ],
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
    instructions: [
      "Blanch spinach, then blend into a smooth puree.",
      "Sauté onion, garlic, and tomato in ghee with cumin.",
      "Add the spinach puree and cubed paneer. Simmer 8–10 minutes.",
      "Stir in cream if you have it, then serve with roti or rice.",
    ],
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
    instructions: [
      "Rinse dal and boil with turmeric until soft.",
      "In ghee, fry cumin, onion, and tomato for the tadka.",
      "Pour the tadka over the dal, simmer 5 minutes, and serve with rice.",
    ],
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
    instructions: [
      "Blend tomato and onion into a gravy base.",
      "Cook the gravy in butter until thick and rich.",
      "Add paneer cubes. Finish with cream or cashews if you have them.",
    ],
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
    instructions: [
      "Beat eggs with salt. Chop onion, tomato, and green chilli.",
      "Pour into a hot pan and scatter the vegetables on top.",
      "Fold and cook until just set. Serve immediately.",
    ],
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
    instructions: [
      "Use leftover or cooled cooked rice.",
      "Stir-fry onion and carrot (and beans if you have them) on high heat.",
      "Add rice, soy sauce if available, and toss until hot.",
    ],
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
    instructions: [
      "Rinse poha and drain. Cube and boil or pan-fry the potato.",
      "Sauté onion and peanuts, then add poha and potato.",
      "Season, toss gently, and serve with lemon.",
    ],
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
    instructions: [
      "Chop apple and banana into bite-size pieces.",
      "Toss with lemon juice and chaat masala if you have it.",
      "Serve immediately so the fruit stays fresh.",
    ],
  },
];

export const aiPick = {
  reasonTitle: "Use your spinach before it expires.",
  recipeTitle: "Palak Paneer",
  reason:
    "Your spinach expires in 2 days and you already have 8 of 9 ingredients.",
  recipeId: "palak-paneer",
};

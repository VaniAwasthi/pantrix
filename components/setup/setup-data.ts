export type DietPreferenceId =
  | "vegetarian"
  | "vegan"
  | "eggetarian"
  | "non-vegetarian";

export type FoodPreferenceId =
  | "home-style"
  | "spicy"
  | "mild"
  | "comfort"
  | "light"
  | "protein-rich";

export type CuisinePreferenceId =
  | "indian"
  | "italian"
  | "chinese"
  | "mexican"
  | "healthy"
  | "asian"
  | "other";

export type CookingTimeId = "under-15" | "15-30" | "30-60" | "enjoy";

export type NutritionGoalId =
  | "balanced"
  | "high-protein"
  | "low-carb"
  | "weight-loss"
  | "muscle-gain"
  | "no-goal";

export const SETUP_STEPS = [
  { id: 1, label: "Onboarding" },
  { id: 2, label: "Groceries" },
] as const;

export const dietPreferences: {
  id: DietPreferenceId;
  label: string;
  emoji: string;
}[] = [
  { id: "vegetarian", label: "Vegetarian", emoji: "🌱" },
  { id: "vegan", label: "Vegan", emoji: "🥬" },
  { id: "eggetarian", label: "Eggetarian", emoji: "🥚" },
  { id: "non-vegetarian", label: "Non-Vegetarian", emoji: "🍗" },
];

export const foodPreferences: {
  id: FoodPreferenceId;
  label: string;
  emoji: string;
}[] = [
  { id: "home-style", label: "Home-style", emoji: "🏠" },
  { id: "spicy", label: "Spicy", emoji: "🌶️" },
  { id: "mild", label: "Mild", emoji: "🌿" },
  { id: "comfort", label: "Comfort food", emoji: "🍲" },
  { id: "light", label: "Light meals", emoji: "🥗" },
  { id: "protein-rich", label: "Protein-rich", emoji: "💪" },
];

export const cuisinePreferences: {
  id: CuisinePreferenceId;
  label: string;
  emoji: string;
}[] = [
  { id: "indian", label: "Indian", emoji: "🇮🇳" },
  { id: "italian", label: "Italian", emoji: "🇮🇹" },
  { id: "chinese", label: "Chinese", emoji: "🇨🇳" },
  { id: "mexican", label: "Mexican", emoji: "🇲🇽" },
  { id: "healthy", label: "Healthy", emoji: "🥗" },
  { id: "asian", label: "Asian", emoji: "🍜" },
  { id: "other", label: "Other", emoji: "🌍" },
];

export const cookingTimeOptions: {
  id: CookingTimeId;
  label: string;
  emoji: string;
}[] = [
  { id: "under-15", label: "Under 15 min", emoji: "⚡" },
  { id: "15-30", label: "15–30 min", emoji: "🍳" },
  { id: "30-60", label: "30–60 min", emoji: "🥘" },
  { id: "enjoy", label: "I enjoy cooking", emoji: "👨‍🍳" },
];

export const nutritionGoals: {
  id: NutritionGoalId;
  label: string;
  emoji: string;
}[] = [
  { id: "balanced", label: "Balanced eating", emoji: "⚖️" },
  { id: "high-protein", label: "High protein", emoji: "🥩" },
  { id: "low-carb", label: "Low carb", emoji: "🥒" },
  { id: "weight-loss", label: "Weight loss", emoji: "🎯" },
  { id: "muscle-gain", label: "Muscle gain", emoji: "🏋️" },
  { id: "no-goal", label: "No specific goal", emoji: "✨" },
];

export type GroceryCategory =
  | "all"
  | "vegetables"
  | "fruits"
  | "dairy"
  | "grains"
  | "pulses"
  | "spices"
  | "protein"
  | "other";

export type GroceryUnit = "pieces" | "g" | "kg" | "ml" | "L" | "packet" | "cups";

export interface CatalogIngredient {
  id: string;
  name: string;
  emoji: string;
  category: Exclude<GroceryCategory, "all">;
  defaultQuantity: number;
  defaultUnit: GroceryUnit;
}

export interface PantryGroceryItem {
  id: string;
  name: string;
  emoji: string;
  category: Exclude<GroceryCategory, "all">;
  quantity: number;
  unit: GroceryUnit;
}

export const groceryCategoryFilters: { id: GroceryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "dairy", label: "Dairy" },
  { id: "grains", label: "Grains" },
  { id: "pulses", label: "Pulses" },
  { id: "spices", label: "Spices" },
  { id: "protein", label: "Protein" },
  { id: "other", label: "Other" },
];

export const popularIngredients: CatalogIngredient[] = [
  { id: "potato", name: "Potato", emoji: "🥔", category: "vegetables", defaultQuantity: 4, defaultUnit: "pieces" },
  { id: "tomato", name: "Tomato", emoji: "🍅", category: "vegetables", defaultQuantity: 4, defaultUnit: "pieces" },
  { id: "onion", name: "Onion", emoji: "🧅", category: "vegetables", defaultQuantity: 3, defaultUnit: "pieces" },
  { id: "carrot", name: "Carrot", emoji: "🥕", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "spinach", name: "Spinach", emoji: "🥬", category: "vegetables", defaultQuantity: 200, defaultUnit: "g" },
  { id: "rice", name: "Rice", emoji: "🍚", category: "grains", defaultQuantity: 1, defaultUnit: "kg" },
  { id: "atta", name: "Atta", emoji: "🌾", category: "grains", defaultQuantity: 1, defaultUnit: "kg" },
  { id: "milk", name: "Milk", emoji: "🥛", category: "dairy", defaultQuantity: 1, defaultUnit: "L" },
  { id: "paneer", name: "Paneer", emoji: "🧀", category: "protein", defaultQuantity: 200, defaultUnit: "g" },
  { id: "dal", name: "Dal", emoji: "🫘", category: "pulses", defaultQuantity: 500, defaultUnit: "g" },
  { id: "eggs", name: "Eggs", emoji: "🥚", category: "protein", defaultQuantity: 6, defaultUnit: "pieces" },
  { id: "green-chilli", name: "Green Chilli", emoji: "🌶️", category: "vegetables", defaultQuantity: 6, defaultUnit: "pieces" },
];

export const groceryCatalog: CatalogIngredient[] = [
  ...popularIngredients,
  { id: "capsicum", name: "Capsicum", emoji: "🫑", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "garlic", name: "Garlic", emoji: "🧄", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "ginger", name: "Ginger", emoji: "🫚", category: "vegetables", defaultQuantity: 50, defaultUnit: "g" },
  { id: "apple", name: "Apple", emoji: "🍎", category: "fruits", defaultQuantity: 3, defaultUnit: "pieces" },
  { id: "banana", name: "Banana", emoji: "🍌", category: "fruits", defaultQuantity: 4, defaultUnit: "pieces" },
  { id: "mango", name: "Mango", emoji: "🥭", category: "fruits", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "curd", name: "Curd", emoji: "🥣", category: "dairy", defaultQuantity: 400, defaultUnit: "g" },
  { id: "butter", name: "Butter", emoji: "🧈", category: "dairy", defaultQuantity: 100, defaultUnit: "g" },
  { id: "ghee", name: "Ghee", emoji: "🫙", category: "dairy", defaultQuantity: 200, defaultUnit: "g" },
  { id: "poha", name: "Poha", emoji: "🌾", category: "grains", defaultQuantity: 500, defaultUnit: "g" },
  { id: "rava", name: "Rava", emoji: "🥣", category: "grains", defaultQuantity: 500, defaultUnit: "g" },
  { id: "toor-dal", name: "Toor Dal", emoji: "🟡", category: "pulses", defaultQuantity: 500, defaultUnit: "g" },
  { id: "moong-dal", name: "Moong Dal", emoji: "🟡", category: "pulses", defaultQuantity: 500, defaultUnit: "g" },
  { id: "rajma", name: "Rajma", emoji: "🫘", category: "pulses", defaultQuantity: 500, defaultUnit: "g" },
  { id: "cumin", name: "Cumin", emoji: "🌿", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "turmeric", name: "Turmeric", emoji: "🟡", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "garam-masala", name: "Garam Masala", emoji: "✨", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "chicken", name: "Chicken", emoji: "🍗", category: "protein", defaultQuantity: 500, defaultUnit: "g" },
  { id: "fish", name: "Fish", emoji: "🐟", category: "protein", defaultQuantity: 400, defaultUnit: "g" },
  { id: "oil", name: "Cooking Oil", emoji: "🫒", category: "other", defaultQuantity: 1, defaultUnit: "L" },
  { id: "sugar", name: "Sugar", emoji: "🍬", category: "other", defaultQuantity: 500, defaultUnit: "g" },
  { id: "bread", name: "Bread", emoji: "🍞", category: "other", defaultQuantity: 1, defaultUnit: "packet" },
];

export const groceryUnits: { value: GroceryUnit; label: string }[] = [
  { value: "pieces", label: "Pieces" },
  { value: "g", label: "Grams (g)" },
  { value: "kg", label: "Kilograms (kg)" },
  { value: "ml", label: "Milliliters (ml)" },
  { value: "L", label: "Liters (L)" },
  { value: "packet", label: "Packet" },
  { value: "cups", label: "Cups" },
];

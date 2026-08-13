export type GroceryCategory =
  | "all"
  | "vegetables"
  | "fruits"
  | "dairy"
  | "grains"
  | "pulses"
  | "spices"
  | "nuts"
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
  /** ISO date string YYYY-MM-DD — set by the user (or suggested, then edited). */
  expiryDate: string;
}

/** Suggested shelf life when adding from catalog; user can (and should) edit. */
export function suggestedExpiryDate(
  category: Exclude<GroceryCategory, "all">
): string {
  const date = new Date();
  const days =
    category === "vegetables" ||
    category === "fruits" ||
    category === "dairy" ||
    category === "protein"
      ? 5
      : category === "spices" ||
          category === "grains" ||
          category === "pulses" ||
          category === "nuts"
        ? 90
        : 14;
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export const groceryCategoryFilters: { id: GroceryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "dairy", label: "Dairy" },
  { id: "grains", label: "Grains" },
  { id: "pulses", label: "Pulses" },
  { id: "spices", label: "Spices" },
  { id: "nuts", label: "Nuts & Seeds" },
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

const vegetables: CatalogIngredient[] = [
  { id: "capsicum", name: "Capsicum", emoji: "🫑", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "garlic", name: "Garlic", emoji: "🧄", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "ginger", name: "Ginger", emoji: "🫚", category: "vegetables", defaultQuantity: 50, defaultUnit: "g" },
  { id: "cucumber", name: "Cucumber", emoji: "🥒", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "cabbage", name: "Cabbage", emoji: "🥬", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "cauliflower", name: "Cauliflower", emoji: "🥦", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "broccoli", name: "Broccoli", emoji: "🥦", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "brinjal", name: "Brinjal", emoji: "🍆", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "lady-finger", name: "Lady Finger (Bhindi)", emoji: "🥬", category: "vegetables", defaultQuantity: 250, defaultUnit: "g" },
  { id: "bottle-gourd", name: "Bottle Gourd (Lauki)", emoji: "🥒", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "bitter-gourd", name: "Bitter Gourd (Karela)", emoji: "🥒", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "ridge-gourd", name: "Ridge Gourd (Turai)", emoji: "🥒", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "pumpkin", name: "Pumpkin", emoji: "🎃", category: "vegetables", defaultQuantity: 500, defaultUnit: "g" },
  { id: "sweet-potato", name: "Sweet Potato", emoji: "🍠", category: "vegetables", defaultQuantity: 3, defaultUnit: "pieces" },
  { id: "radish", name: "Radish (Mooli)", emoji: "🥕", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "beetroot", name: "Beetroot", emoji: "🫐", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "peas", name: "Green Peas", emoji: "🟢", category: "vegetables", defaultQuantity: 200, defaultUnit: "g" },
  { id: "corn", name: "Corn", emoji: "🌽", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "mushroom", name: "Mushroom", emoji: "🍄", category: "vegetables", defaultQuantity: 200, defaultUnit: "g" },
  { id: "beans", name: "French Beans", emoji: "🫘", category: "vegetables", defaultQuantity: 250, defaultUnit: "g" },
  { id: "cluster-beans", name: "Cluster Beans (Gavar)", emoji: "🫘", category: "vegetables", defaultQuantity: 250, defaultUnit: "g" },
  { id: "spring-onion", name: "Spring Onion", emoji: "🧅", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "leek", name: "Leek", emoji: "🧅", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "celery", name: "Celery", emoji: "🥬", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "lettuce", name: "Lettuce", emoji: "🥬", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "methi", name: "Fenugreek Leaves (Methi)", emoji: "🌿", category: "vegetables", defaultQuantity: 100, defaultUnit: "g" },
  { id: "coriander-leaves", name: "Coriander Leaves", emoji: "🌿", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "mint", name: "Mint Leaves", emoji: "🍃", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "curry-leaves", name: "Curry Leaves", emoji: "🍃", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "drumstick", name: "Drumstick", emoji: "🌱", category: "vegetables", defaultQuantity: 4, defaultUnit: "pieces" },
  { id: "raw-banana", name: "Raw Banana", emoji: "🍌", category: "vegetables", defaultQuantity: 3, defaultUnit: "pieces" },
  { id: "yam", name: "Yam (Jimikand)", emoji: "🥔", category: "vegetables", defaultQuantity: 500, defaultUnit: "g" },
  { id: "colocasia", name: "Colocasia (Arbi)", emoji: "🥔", category: "vegetables", defaultQuantity: 400, defaultUnit: "g" },
  { id: "turnip", name: "Turnip (Shalgam)", emoji: "🟣", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "zucchini", name: "Zucchini", emoji: "🥒", category: "vegetables", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "ash-gourd", name: "Ash Gourd (Petha)", emoji: "🍈", category: "vegetables", defaultQuantity: 500, defaultUnit: "g" },
  { id: "snake-gourd", name: "Snake Gourd", emoji: "🥒", category: "vegetables", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "ivy-gourd", name: "Ivy Gourd (Tindora)", emoji: "🥒", category: "vegetables", defaultQuantity: 250, defaultUnit: "g" },
  { id: "pointed-gourd", name: "Pointed Gourd (Parwal)", emoji: "🥒", category: "vegetables", defaultQuantity: 250, defaultUnit: "g" },
  { id: "red-chilli", name: "Red Chilli (Fresh)", emoji: "🌶️", category: "vegetables", defaultQuantity: 6, defaultUnit: "pieces" },
  { id: "lemon", name: "Lemon", emoji: "🍋", category: "vegetables", defaultQuantity: 4, defaultUnit: "pieces" },
];

const spices: CatalogIngredient[] = [
  { id: "cumin", name: "Cumin (Jeera)", emoji: "🌿", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "turmeric", name: "Turmeric (Haldi)", emoji: "🟡", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "garam-masala", name: "Garam Masala", emoji: "✨", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "coriander-powder", name: "Coriander Powder (Dhania)", emoji: "🌿", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "red-chilli-powder", name: "Red Chilli Powder", emoji: "🌶️", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "black-pepper", name: "Black Pepper", emoji: "⚫", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "mustard-seeds", name: "Mustard Seeds (Rai)", emoji: "🟤", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "fenugreek-seeds", name: "Fenugreek Seeds (Methi Dana)", emoji: "🟡", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "fennel-seeds", name: "Fennel Seeds (Saunf)", emoji: "🌿", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "carom-seeds", name: "Carom Seeds (Ajwain)", emoji: "🌿", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "nigella-seeds", name: "Nigella Seeds (Kalonji)", emoji: "⚫", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "asafoetida", name: "Asafoetida (Hing)", emoji: "🫙", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "cardamom", name: "Cardamom (Elaichi)", emoji: "🟢", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "black-cardamom", name: "Black Cardamom", emoji: "🟤", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "cloves", name: "Cloves (Laung)", emoji: "🟤", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "cinnamon", name: "Cinnamon (Dalchini)", emoji: "🪵", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "bay-leaf", name: "Bay Leaf (Tej Patta)", emoji: "🍃", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "star-anise", name: "Star Anise", emoji: "⭐", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "nutmeg", name: "Nutmeg (Jaiphal)", emoji: "🟤", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "mace", name: "Mace (Javitri)", emoji: "🧡", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "saffron", name: "Saffron (Kesar)", emoji: "🧡", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "kasuri-methi", name: "Kasuri Methi", emoji: "🌿", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "amchur", name: "Amchur (Dry Mango)", emoji: "🥭", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "chaat-masala", name: "Chaat Masala", emoji: "✨", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "pav-bhaji-masala", name: "Pav Bhaji Masala", emoji: "✨", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "kitchen-king", name: "Kitchen King Masala", emoji: "✨", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "sambar-powder", name: "Sambar Powder", emoji: "🌶️", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "rasam-powder", name: "Rasam Powder", emoji: "🌶️", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "biryani-masala", name: "Biryani Masala", emoji: "✨", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "tandoori-masala", name: "Tandoori Masala", emoji: "🔥", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "chole-masala", name: "Chole Masala", emoji: "✨", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "meat-masala", name: "Meat Masala", emoji: "✨", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "fish-masala", name: "Fish Masala", emoji: "✨", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "cumin-powder", name: "Cumin Powder", emoji: "🌿", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "salt", name: "Salt", emoji: "🧂", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "rock-salt", name: "Rock Salt (Sendha Namak)", emoji: "🧂", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "black-salt", name: "Black Salt (Kala Namak)", emoji: "🧂", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "sugar-spice", name: "Sugar", emoji: "🍬", category: "spices", defaultQuantity: 500, defaultUnit: "g" },
  { id: "jaggery", name: "Jaggery (Gur)", emoji: "🟤", category: "spices", defaultQuantity: 250, defaultUnit: "g" },
  { id: "dry-red-chilli", name: "Dry Red Chilli", emoji: "🌶️", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "paprika", name: "Paprika", emoji: "🌶️", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "oregano", name: "Oregano", emoji: "🌿", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "italian-seasoning", name: "Italian Seasoning", emoji: "🌿", category: "spices", defaultQuantity: 1, defaultUnit: "packet" },
];

const nuts: CatalogIngredient[] = [
  { id: "almonds", name: "Almonds (Badam)", emoji: "🌰", category: "nuts", defaultQuantity: 200, defaultUnit: "g" },
  { id: "cashews", name: "Cashews (Kaju)", emoji: "🥜", category: "nuts", defaultQuantity: 200, defaultUnit: "g" },
  { id: "walnuts", name: "Walnuts (Akhrot)", emoji: "🌰", category: "nuts", defaultQuantity: 200, defaultUnit: "g" },
  { id: "pistachios", name: "Pistachios (Pista)", emoji: "🟢", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "peanuts", name: "Peanuts (Mungfali)", emoji: "🥜", category: "nuts", defaultQuantity: 250, defaultUnit: "g" },
  { id: "raisins", name: "Raisins (Kishmish)", emoji: "🍇", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "dates", name: "Dates (Khajoor)", emoji: "🌴", category: "nuts", defaultQuantity: 200, defaultUnit: "g" },
  { id: "figs", name: "Figs (Anjeer)", emoji: "🟤", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "apricot", name: "Dried Apricot", emoji: "🧡", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "coconut", name: "Coconut", emoji: "🥥", category: "nuts", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "desiccated-coconut", name: "Desiccated Coconut", emoji: "🥥", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "chia-seeds", name: "Chia Seeds", emoji: "⚫", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "flax-seeds", name: "Flax Seeds (Alsi)", emoji: "🟤", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "pumpkin-seeds", name: "Pumpkin Seeds", emoji: "🟡", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "sunflower-seeds", name: "Sunflower Seeds", emoji: "🌻", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "sesame-seeds", name: "Sesame Seeds (Til)", emoji: "⚪", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "melon-seeds", name: "Melon Seeds (Magaz)", emoji: "⚪", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "pine-nuts", name: "Pine Nuts", emoji: "🥜", category: "nuts", defaultQuantity: 50, defaultUnit: "g" },
  { id: "hazelnuts", name: "Hazelnuts", emoji: "🌰", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
  { id: "macadamia", name: "Macadamia Nuts", emoji: "🥜", category: "nuts", defaultQuantity: 100, defaultUnit: "g" },
];

const otherCatalog: CatalogIngredient[] = [
  { id: "apple", name: "Apple", emoji: "🍎", category: "fruits", defaultQuantity: 3, defaultUnit: "pieces" },
  { id: "banana", name: "Banana", emoji: "🍌", category: "fruits", defaultQuantity: 4, defaultUnit: "pieces" },
  { id: "mango", name: "Mango", emoji: "🥭", category: "fruits", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "orange", name: "Orange", emoji: "🍊", category: "fruits", defaultQuantity: 4, defaultUnit: "pieces" },
  { id: "papaya", name: "Papaya", emoji: "🧡", category: "fruits", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "guava", name: "Guava", emoji: "🟢", category: "fruits", defaultQuantity: 3, defaultUnit: "pieces" },
  { id: "pomegranate", name: "Pomegranate", emoji: "🔴", category: "fruits", defaultQuantity: 2, defaultUnit: "pieces" },
  { id: "grapes", name: "Grapes", emoji: "🍇", category: "fruits", defaultQuantity: 500, defaultUnit: "g" },
  { id: "watermelon", name: "Watermelon", emoji: "🍉", category: "fruits", defaultQuantity: 1, defaultUnit: "pieces" },
  { id: "curd", name: "Curd", emoji: "🥣", category: "dairy", defaultQuantity: 400, defaultUnit: "g" },
  { id: "butter", name: "Butter", emoji: "🧈", category: "dairy", defaultQuantity: 100, defaultUnit: "g" },
  { id: "ghee", name: "Ghee", emoji: "🫙", category: "dairy", defaultQuantity: 200, defaultUnit: "g" },
  { id: "cream", name: "Cream", emoji: "🥛", category: "dairy", defaultQuantity: 200, defaultUnit: "ml" },
  { id: "cheese", name: "Cheese", emoji: "🧀", category: "dairy", defaultQuantity: 200, defaultUnit: "g" },
  { id: "poha", name: "Poha", emoji: "🌾", category: "grains", defaultQuantity: 500, defaultUnit: "g" },
  { id: "rava", name: "Rava", emoji: "🥣", category: "grains", defaultQuantity: 500, defaultUnit: "g" },
  { id: "oats", name: "Oats", emoji: "🥣", category: "grains", defaultQuantity: 500, defaultUnit: "g" },
  { id: "quinoa", name: "Quinoa", emoji: "🌾", category: "grains", defaultQuantity: 500, defaultUnit: "g" },
  { id: "toor-dal", name: "Toor Dal", emoji: "🟡", category: "pulses", defaultQuantity: 500, defaultUnit: "g" },
  { id: "moong-dal", name: "Moong Dal", emoji: "🟡", category: "pulses", defaultQuantity: 500, defaultUnit: "g" },
  { id: "masoor-dal", name: "Masoor Dal", emoji: "🟠", category: "pulses", defaultQuantity: 500, defaultUnit: "g" },
  { id: "chana-dal", name: "Chana Dal", emoji: "🟡", category: "pulses", defaultQuantity: 500, defaultUnit: "g" },
  { id: "rajma", name: "Rajma", emoji: "🫘", category: "pulses", defaultQuantity: 500, defaultUnit: "g" },
  { id: "chickpeas", name: "Chickpeas (Chole)", emoji: "🟤", category: "pulses", defaultQuantity: 500, defaultUnit: "g" },
  { id: "black-chana", name: "Black Chana", emoji: "⚫", category: "pulses", defaultQuantity: 500, defaultUnit: "g" },
  { id: "chicken", name: "Chicken", emoji: "🍗", category: "protein", defaultQuantity: 500, defaultUnit: "g" },
  { id: "fish", name: "Fish", emoji: "🐟", category: "protein", defaultQuantity: 400, defaultUnit: "g" },
  { id: "mutton", name: "Mutton", emoji: "🍖", category: "protein", defaultQuantity: 500, defaultUnit: "g" },
  { id: "oil", name: "Cooking Oil", emoji: "🫒", category: "other", defaultQuantity: 1, defaultUnit: "L" },
  { id: "mustard-oil", name: "Mustard Oil", emoji: "🫒", category: "other", defaultQuantity: 1, defaultUnit: "L" },
  { id: "sugar", name: "Sugar", emoji: "🍬", category: "other", defaultQuantity: 500, defaultUnit: "g" },
  { id: "bread", name: "Bread", emoji: "🍞", category: "other", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "tea", name: "Tea", emoji: "🍵", category: "other", defaultQuantity: 1, defaultUnit: "packet" },
  { id: "coffee", name: "Coffee", emoji: "☕", category: "other", defaultQuantity: 1, defaultUnit: "packet" },
];

export const groceryCatalog: CatalogIngredient[] = [
  ...popularIngredients,
  ...vegetables,
  ...spices,
  ...nuts,
  ...otherCatalog,
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

export type MealType =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "snack"
  | "dessert"
  | "drink";

export type SeedRecipe = {
  title: string;
  description: string;
  mealType: MealType;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: { name: string; quantity?: string }[];
  instructions: string[];
  tags: string[];
};

const spice = [
  { name: "cumin", quantity: "1/2 tsp" },
  { name: "turmeric", quantity: "1/4 tsp" },
  { name: "chilli powder", quantity: "1/2 tsp" },
  { name: "salt", quantity: "to taste" },
];

const tadkaBase = [
  { name: "onion", quantity: "100g" },
  { name: "tomato", quantity: "100g" },
  { name: "garlic", quantity: "10g" },
  { name: "ginger", quantity: "10g" },
  { name: "cooking oil", quantity: "2 tbsp" },
  ...spice,
];

function r(
  title: string,
  mealType: MealType,
  ingredients: { name: string; quantity?: string }[],
  opts?: Partial<SeedRecipe>
): SeedRecipe {
  return {
    title,
    description: opts?.description ?? `Homestyle Indian ${title}.`,
    mealType,
    prepTime: opts?.prepTime ?? 10,
    cookTime: opts?.cookTime ?? 20,
    servings: opts?.servings ?? 2,
    ingredients,
    instructions: opts?.instructions ?? [
      `Prep ingredients for ${title}.`,
      "Cook with spices until done.",
      "Taste, adjust salt, and serve hot.",
    ],
    tags: opts?.tags ?? ["indian"],
  };
}

function paratha(title: string, filling: string): SeedRecipe {
  return r(
    title,
    "breakfast",
    [
      { name: "atta", quantity: "200g" },
      { name: filling, quantity: "150g" },
      { name: "onion", quantity: "50g" },
      { name: "cumin", quantity: "1/2 tsp" },
      { name: "chilli powder", quantity: "1/4 tsp" },
      { name: "salt", quantity: "to taste" },
      { name: "ghee", quantity: "1 tbsp" },
    ],
    {
      description: `Stuffed ${title} with spices — breakfast classic.`,
      tags: ["paratha", "breakfast", "punjabi"],
      cookTime: 25,
    }
  );
}

function dal(title: string, dalName: string): SeedRecipe {
  return r(
    title,
    "lunch",
    [
      { name: dalName, quantity: "150g" },
      { name: "onion", quantity: "50g" },
      { name: "tomato", quantity: "50g" },
      { name: "garlic", quantity: "10g" },
      { name: "cumin", quantity: "1/2 tsp" },
      { name: "turmeric", quantity: "1/4 tsp" },
      { name: "ghee", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
      { name: "rice", quantity: "150g" },
    ],
    {
      description: `${title} with tadka — everyday dal rice meal.`,
      tags: ["dal", "vegetarian", "comfort"],
      cookTime: 30,
    }
  );
}

function sabzi(title: string, mains: string[]): SeedRecipe {
  return r(
    title,
    "lunch",
    [
      ...mains.map((name) => ({ name, quantity: "150g" })),
      { name: "onion", quantity: "50g" },
      { name: "tomato", quantity: "50g" },
      { name: "cooking oil", quantity: "2 tbsp" },
      ...spice,
    ],
    {
      description: `${title} dry/semi-dry sabzi for roti or rice.`,
      tags: ["sabzi", "vegetarian"],
      cookTime: 25,
    }
  );
}

function paneerDish(title: string, extras: string[] = []): SeedRecipe {
  return r(
    title,
    "dinner",
    [
      { name: "paneer", quantity: "200g" },
      ...extras.map((name) => ({ name, quantity: "100g" })),
      ...tadkaBase,
      { name: "garam masala", quantity: "1/2 tsp" },
    ],
    {
      description: `${title} — rich paneer curry.`,
      tags: ["paneer", "vegetarian"],
      cookTime: 30,
    }
  );
}

function chickenDish(title: string, extras: string[] = []): SeedRecipe {
  return r(
    title,
    "dinner",
    [
      { name: "chicken", quantity: "400g" },
      ...extras.map((name) => ({ name, quantity: "100g" })),
      ...tadkaBase,
      { name: "garam masala", quantity: "1 tsp" },
      { name: "curd", quantity: "50g" },
    ],
    {
      description: `${title} — non-veg dinner favourite.`,
      tags: ["chicken", "non-veg"],
      cookTime: 35,
    }
  );
}

function eggDish(title: string, mealType: MealType = "dinner"): SeedRecipe {
  return r(
    title,
    mealType,
    [
      { name: "egg", quantity: "4" },
      { name: "onion", quantity: "100g" },
      { name: "tomato", quantity: "100g" },
      { name: "cooking oil", quantity: "2 tbsp" },
      ...spice,
    ],
    {
      description: `${title} with onion-tomato masala.`,
      tags: ["egg"],
      cookTime: 20,
    }
  );
}

function muttonDish(title: string): SeedRecipe {
  return r(
    title,
    "dinner",
    [
      { name: "mutton", quantity: "400g" },
      ...tadkaBase,
      { name: "garam masala", quantity: "1 tsp" },
      { name: "curd", quantity: "50g" },
    ],
    {
      description: `${title} — slow-cooked mutton.`,
      tags: ["mutton", "non-veg"],
      cookTime: 50,
      prepTime: 15,
    }
  );
}

function fishDish(title: string): SeedRecipe {
  return r(
    title,
    "dinner",
    [
      { name: "fish", quantity: "400g" },
      { name: "onion", quantity: "100g" },
      { name: "tomato", quantity: "100g" },
      { name: "mustard oil", quantity: "2 tbsp" },
      { name: "turmeric", quantity: "1/2 tsp" },
      { name: "chilli powder", quantity: "1/2 tsp" },
      { name: "salt", quantity: "to taste" },
    ],
    {
      description: `${title}.`,
      tags: ["fish", "non-veg"],
      cookTime: 25,
    }
  );
}

function riceDish(title: string, extras: string[] = []): SeedRecipe {
  return r(
    title,
    "lunch",
    [
      { name: "rice", quantity: "200g" },
      ...extras.map((name) => ({ name, quantity: "80g" })),
      { name: "cumin", quantity: "1 tsp" },
      { name: "ghee", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    {
      description: `${title}.`,
      tags: ["rice"],
      cookTime: 20,
    }
  );
}

function rotiBread(title: string, flour: string): SeedRecipe {
  return r(
    title,
    "lunch",
    [
      { name: flour, quantity: "200g" },
      { name: "salt", quantity: "to taste" },
      { name: "ghee", quantity: "1 tbsp" },
      { name: "water", quantity: "as needed" },
    ],
    {
      description: `${title} — fresh Indian bread.`,
      tags: ["roti", "bread"],
      cookTime: 15,
      prepTime: 15,
    }
  );
}

function snack(
  title: string,
  ingredients: { name: string; quantity?: string }[]
): SeedRecipe {
  return r(title, "snack", ingredients, {
    description: `${title} — evening snack.`,
    tags: ["snack", "evening"],
    cookTime: 20,
  });
}

function dessert(
  title: string,
  ingredients: { name: string; quantity?: string }[]
): SeedRecipe {
  return r(title, "dessert", ingredients, {
    description: `${title} — Indian sweet.`,
    tags: ["dessert", "sweet"],
    cookTime: 30,
  });
}

function drink(
  title: string,
  ingredients: { name: string; quantity?: string }[]
): SeedRecipe {
  return r(title, "drink", ingredients, {
    description: `${title}.`,
    tags: ["drink", "beverage"],
    cookTime: 10,
    prepTime: 5,
  });
}

export const INDIAN_RECIPES: SeedRecipe[] = [
  // ——— Breakfast ———
  paratha("Aloo Paratha", "potato"),
  paratha("Gobi Paratha", "cauliflower"),
  paratha("Paneer Paratha", "paneer"),
  paratha("Mooli Paratha", "radish"),
  paratha("Methi Paratha", "fenugreek leaves"),
  r(
    "Missi Roti",
    "breakfast",
    [
      { name: "atta", quantity: "100g" },
      { name: "besan", quantity: "100g" },
      { name: "onion", quantity: "50g" },
      { name: "cumin", quantity: "1/2 tsp" },
      { name: "salt", quantity: "to taste" },
      { name: "ghee", quantity: "1 tbsp" },
    ],
    { tags: ["roti", "breakfast"] }
  ),
  r(
    "Poori Bhaji",
    "breakfast",
    [
      { name: "atta", quantity: "200g" },
      { name: "potato", quantity: "200g" },
      { name: "onion", quantity: "50g" },
      { name: "tomato", quantity: "50g" },
      { name: "cooking oil", quantity: "for frying" },
      ...spice,
    ],
    { tags: ["poori", "breakfast"], cookTime: 30 }
  ),
  r(
    "Chole Bhature",
    "breakfast",
    [
      { name: "chole", quantity: "200g" },
      { name: "maida", quantity: "200g" },
      { name: "onion", quantity: "100g" },
      { name: "tomato", quantity: "100g" },
      { name: "curd", quantity: "50g" },
      { name: "cooking oil", quantity: "for frying" },
      { name: "garam masala", quantity: "1 tsp" },
      ...spice,
    ],
    { tags: ["chole", "punjabi"], cookTime: 45, prepTime: 20 }
  ),
  r(
    "Poha",
    "breakfast",
    [
      { name: "poha", quantity: "150g" },
      { name: "onion", quantity: "80g" },
      { name: "potato", quantity: "80g" },
      { name: "peanut", quantity: "30g" },
      { name: "turmeric", quantity: "1/4 tsp" },
      { name: "mustard oil", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["poha", "quick"], cookTime: 15 }
  ),
  r(
    "Upma",
    "breakfast",
    [
      { name: "rava", quantity: "150g" },
      { name: "onion", quantity: "80g" },
      { name: "carrot", quantity: "50g" },
      { name: "tomato", quantity: "50g" },
      { name: "mustard oil", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["upma", "south-indian"] }
  ),
  r(
    "Idli",
    "breakfast",
    [
      { name: "urad dal", quantity: "100g" },
      { name: "rice", quantity: "200g" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["idli", "south-indian"], cookTime: 20, prepTime: 30 }
  ),
  r(
    "Masala Dosa",
    "breakfast",
    [
      { name: "rice", quantity: "200g" },
      { name: "urad dal", quantity: "80g" },
      { name: "potato", quantity: "200g" },
      { name: "onion", quantity: "80g" },
      { name: "cooking oil", quantity: "2 tbsp" },
      ...spice,
    ],
    { tags: ["dosa", "south-indian"], cookTime: 30 }
  ),
  r(
    "Plain Dosa",
    "breakfast",
    [
      { name: "rice", quantity: "200g" },
      { name: "urad dal", quantity: "80g" },
      { name: "salt", quantity: "to taste" },
      { name: "cooking oil", quantity: "1 tbsp" },
    ],
    { tags: ["dosa"] }
  ),
  r(
    "Rava Dosa",
    "breakfast",
    [
      { name: "rava", quantity: "150g" },
      { name: "rice", quantity: "50g" },
      { name: "onion", quantity: "50g" },
      { name: "cumin", quantity: "1/2 tsp" },
      { name: "cooking oil", quantity: "2 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["dosa", "rava"] }
  ),
  r(
    "Uttapam",
    "breakfast",
    [
      { name: "rice", quantity: "150g" },
      { name: "urad dal", quantity: "60g" },
      { name: "onion", quantity: "80g" },
      { name: "tomato", quantity: "80g" },
      { name: "cooking oil", quantity: "2 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["uttapam"] }
  ),
  r(
    "Medu Vada",
    "breakfast",
    [
      { name: "urad dal", quantity: "200g" },
      { name: "onion", quantity: "50g" },
      { name: "cooking oil", quantity: "for frying" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["vada"] }
  ),
  r(
    "Besan Chilla",
    "breakfast",
    [
      { name: "besan", quantity: "150g" },
      { name: "onion", quantity: "50g" },
      { name: "tomato", quantity: "50g" },
      { name: "cooking oil", quantity: "2 tbsp" },
      ...spice,
    ],
    { tags: ["chilla", "quick"] }
  ),
  r(
    "Moong Dal Chilla",
    "breakfast",
    [
      { name: "moong dal", quantity: "150g" },
      { name: "onion", quantity: "50g" },
      { name: "spinach", quantity: "50g" },
      { name: "cooking oil", quantity: "2 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["chilla"] }
  ),
  r(
    "Paneer Chilla",
    "breakfast",
    [
      { name: "besan", quantity: "100g" },
      { name: "paneer", quantity: "100g" },
      { name: "onion", quantity: "50g" },
      { name: "cooking oil", quantity: "2 tbsp" },
      ...spice,
    ],
    { tags: ["chilla", "paneer"] }
  ),
  r(
    "Sabudana Khichdi",
    "breakfast",
    [
      { name: "sabudana", quantity: "150g" },
      { name: "potato", quantity: "100g" },
      { name: "peanut", quantity: "40g" },
      { name: "cumin", quantity: "1/2 tsp" },
      { name: "cooking oil", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["sabudana", "vrat"] }
  ),
  r(
    "Sabudana Vada",
    "breakfast",
    [
      { name: "sabudana", quantity: "150g" },
      { name: "potato", quantity: "150g" },
      { name: "peanut", quantity: "40g" },
      { name: "cooking oil", quantity: "for frying" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["sabudana"] }
  ),
  r(
    "Moong Dal Kachori",
    "breakfast",
    [
      { name: "moong dal", quantity: "100g" },
      { name: "maida", quantity: "150g" },
      { name: "cooking oil", quantity: "for frying" },
      ...spice,
    ],
    { tags: ["kachori"] }
  ),
  r(
    "Bread Pakora",
    "breakfast",
    [
      { name: "bread", quantity: "4 slices" },
      { name: "besan", quantity: "100g" },
      { name: "potato", quantity: "100g" },
      { name: "cooking oil", quantity: "for frying" },
      ...spice,
    ],
    { tags: ["pakora", "snack"] }
  ),
  r(
    "Dhokla",
    "breakfast",
    [
      { name: "besan", quantity: "150g" },
      { name: "curd", quantity: "80g" },
      { name: "turmeric", quantity: "1/4 tsp" },
      { name: "mustard seeds", quantity: "1/2 tsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["gujarati", "dhokla"] }
  ),
  r(
    "Thepla",
    "breakfast",
    [
      { name: "atta", quantity: "200g" },
      { name: "fenugreek leaves", quantity: "50g" },
      { name: "curd", quantity: "40g" },
      { name: "turmeric", quantity: "1/4 tsp" },
      { name: "cooking oil", quantity: "2 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["gujarati", "thepla"] }
  ),
  r(
    "Misal Pav",
    "breakfast",
    [
      { name: "sev", quantity: "handful" },
      { name: "pav", quantity: "4" },
      { name: "onion", quantity: "80g" },
      { name: "tomato", quantity: "80g" },
      { name: "sprouts", quantity: "150g" },
      ...spice,
    ],
    { tags: ["maharashtrian"], cookTime: 30 }
  ),
  r(
    "Pav Bhaji",
    "breakfast",
    [
      { name: "potato", quantity: "200g" },
      { name: "tomato", quantity: "150g" },
      { name: "onion", quantity: "100g" },
      { name: "capsicum", quantity: "50g" },
      { name: "peas", quantity: "50g" },
      { name: "pav", quantity: "4" },
      { name: "butter", quantity: "30g" },
      ...spice,
    ],
    { tags: ["pav-bhaji", "mumbai"], cookTime: 35 }
  ),
  r(
    "Vegetable Sandwich",
    "breakfast",
    [
      { name: "bread", quantity: "4 slices" },
      { name: "cucumber", quantity: "50g" },
      { name: "tomato", quantity: "50g" },
      { name: "onion", quantity: "30g" },
      { name: "butter", quantity: "15g" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["sandwich", "quick"], cookTime: 10 }
  ),
  r(
    "Masala Omelette",
    "breakfast",
    [
      { name: "egg", quantity: "3" },
      { name: "onion", quantity: "40g" },
      { name: "tomato", quantity: "40g" },
      { name: "green chilli", quantity: "1" },
      { name: "cooking oil", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["egg", "breakfast"], cookTime: 10 }
  ),
  r(
    "Egg Bhurji",
    "breakfast",
    [
      { name: "egg", quantity: "4" },
      { name: "onion", quantity: "80g" },
      { name: "tomato", quantity: "80g" },
      { name: "capsicum", quantity: "40g" },
      { name: "cooking oil", quantity: "2 tbsp" },
      ...spice,
    ],
    { tags: ["egg", "breakfast"], cookTime: 15 }
  ),

  // ——— Dal (lunch) ———
  dal("Dal Tadka", "dal"),
  r(
    "Dal Makhani",
    "dinner",
    [
      { name: "urad dal", quantity: "150g" },
      { name: "rajma", quantity: "50g" },
      { name: "butter", quantity: "30g" },
      { name: "cream", quantity: "30g" },
      { name: "tomato", quantity: "100g" },
      { name: "garlic", quantity: "10g" },
      { name: "garam masala", quantity: "1/2 tsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["dal", "punjabi"], cookTime: 45 }
  ),
  dal("Moong Dal", "moong dal"),
  dal("Masoor Dal", "masoor dal"),
  dal("Chana Dal", "chana dal"),
  dal("Toor Dal", "toor dal"),
  r(
    "Palak Dal",
    "lunch",
    [
      { name: "dal", quantity: "120g" },
      { name: "spinach", quantity: "150g" },
      { name: "onion", quantity: "50g" },
      { name: "garlic", quantity: "10g" },
      { name: "cumin", quantity: "1/2 tsp" },
      { name: "ghee", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
      { name: "rice", quantity: "150g" },
    ],
    { tags: ["dal", "palak"] }
  ),
  r(
    "Dal Dhansak",
    "dinner",
    [
      { name: "dal", quantity: "100g" },
      { name: "masoor dal", quantity: "50g" },
      { name: "pumpkin", quantity: "100g" },
      { name: "tomato", quantity: "80g" },
      { name: "onion", quantity: "80g" },
      ...spice,
    ],
    { tags: ["parsi", "dal"] }
  ),
  r(
    "Panchmel Dal",
    "lunch",
    [
      { name: "moong dal", quantity: "40g" },
      { name: "masoor dal", quantity: "40g" },
      { name: "chana dal", quantity: "40g" },
      { name: "toor dal", quantity: "40g" },
      { name: "urad dal", quantity: "40g" },
      { name: "ghee", quantity: "1 tbsp" },
      ...spice,
    ],
    { tags: ["rajasthani", "dal"] }
  ),

  // ——— Sabzi ———
  sabzi("Aloo Gobhi", ["potato", "cauliflower"]),
  sabzi("Aloo Jeera", ["potato"]),
  sabzi("Aloo Matar", ["potato", "peas"]),
  sabzi("Aloo Shimla Mirch", ["potato", "capsicum"]),
  sabzi("Bhindi Masala", ["okra"]),
  sabzi("Baingan Bharta", ["eggplant"]),
  sabzi("Baingan Aloo", ["eggplant", "potato"]),
  sabzi("Lauki Sabzi", ["bottle gourd"]),
  r(
    "Lauki Chana Dal",
    "lunch",
    [
      { name: "bottle gourd", quantity: "200g" },
      { name: "chana dal", quantity: "80g" },
      ...tadkaBase,
    ],
    { tags: ["sabzi"] }
  ),
  sabzi("Tori Sabzi", ["ridge gourd"]),
  sabzi("Tinda Masala", ["apple gourd"]),
  sabzi("Karela Sabzi", ["bitter gourd"]),
  sabzi("Cabbage Sabzi", ["cabbage"]),
  sabzi("Cabbage Peas", ["cabbage", "peas"]),
  sabzi("Beans Aloo", ["beans", "potato"]),
  sabzi("Gajar Matar", ["carrot", "peas"]),
  sabzi("Matar Mushroom", ["peas", "mushroom"]),
  sabzi("Palak Corn", ["spinach", "corn"]),
  sabzi("Palak Aloo", ["spinach", "potato"]),
  sabzi("Mix Veg", ["carrot", "beans", "peas", "potato"]),
  sabzi("Kaddu Sabzi", ["pumpkin"]),
  r(
    "Kadhi Pakora",
    "lunch",
    [
      { name: "besan", quantity: "100g" },
      { name: "curd", quantity: "200g" },
      { name: "cumin", quantity: "1/2 tsp" },
      { name: "turmeric", quantity: "1/4 tsp" },
      { name: "cooking oil", quantity: "2 tbsp" },
      { name: "salt", quantity: "to taste" },
      { name: "rice", quantity: "150g" },
    ],
    { tags: ["kadhi", "punjabi"], cookTime: 35 }
  ),

  // ——— Paneer ———
  paneerDish("Paneer Butter Masala", ["tomato", "butter", "cream"]),
  paneerDish("Shahi Paneer", ["cream", "tomato"]),
  paneerDish("Kadai Paneer", ["capsicum", "tomato"]),
  paneerDish("Palak Paneer", ["spinach"]),
  paneerDish("Matar Paneer", ["peas"]),
  paneerDish("Paneer Bhurji"),
  paneerDish("Chilli Paneer", ["capsicum", "green chilli"]),
  paneerDish("Paneer Do Pyaza", ["onion"]),
  r(
    "Paneer Tikka",
    "snack",
    [
      { name: "paneer", quantity: "200g" },
      { name: "curd", quantity: "80g" },
      { name: "capsicum", quantity: "80g" },
      { name: "onion", quantity: "80g" },
      { name: "garam masala", quantity: "1 tsp" },
      ...spice,
    ],
    { tags: ["paneer", "tikka"], mealType: "snack" as MealType }
  ),

  // ——— Chicken ———
  chickenDish("Butter Chicken", ["butter", "cream", "tomato"]),
  chickenDish("Chicken Curry"),
  chickenDish("Kadai Chicken", ["capsicum"]),
  chickenDish("Chicken Tikka Masala", ["tomato", "cream"]),
  r(
    "Chicken Biryani",
    "dinner",
    [
      { name: "chicken", quantity: "400g" },
      { name: "rice", quantity: "300g" },
      { name: "onion", quantity: "150g" },
      { name: "tomato", quantity: "80g" },
      { name: "curd", quantity: "80g" },
      { name: "ghee", quantity: "2 tbsp" },
      { name: "garam masala", quantity: "1 tsp" },
      ...spice,
    ],
    { tags: ["biryani", "chicken"], cookTime: 45 }
  ),
  r(
    "Chicken Pulao",
    "dinner",
    [
      { name: "chicken", quantity: "300g" },
      { name: "rice", quantity: "250g" },
      { name: "onion", quantity: "100g" },
      { name: "ghee", quantity: "2 tbsp" },
      ...spice,
    ],
    { tags: ["pulao", "chicken"] }
  ),
  chickenDish("Chicken Korma", ["curd", "cream"]),
  chickenDish("Chicken Do Pyaza", ["onion"]),
  chickenDish("Chicken Saag", ["spinach"]),
  r(
    "Chicken 65",
    "snack",
    [
      { name: "chicken", quantity: "300g" },
      { name: "curd", quantity: "50g" },
      { name: "chilli powder", quantity: "1 tsp" },
      { name: "garlic", quantity: "10g" },
      { name: "cooking oil", quantity: "for frying" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["chicken", "starter"] }
  ),
  chickenDish("Tandoori Chicken", ["curd"]),

  // ——— Egg ———
  eggDish("Egg Curry", "dinner"),
  r(
    "Egg Biryani",
    "dinner",
    [
      { name: "egg", quantity: "4" },
      { name: "rice", quantity: "250g" },
      { name: "onion", quantity: "100g" },
      { name: "tomato", quantity: "80g" },
      { name: "ghee", quantity: "2 tbsp" },
      ...spice,
    ],
    { tags: ["biryani", "egg"] }
  ),
  r(
    "Egg Fried Rice",
    "lunch",
    [
      { name: "egg", quantity: "2" },
      { name: "rice", quantity: "200g" },
      { name: "onion", quantity: "50g" },
      { name: "carrot", quantity: "50g" },
      { name: "cooking oil", quantity: "2 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["fried-rice", "egg"] }
  ),
  r(
    "Anda Paratha",
    "breakfast",
    [
      { name: "atta", quantity: "150g" },
      { name: "egg", quantity: "2" },
      { name: "onion", quantity: "40g" },
      { name: "ghee", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["paratha", "egg"] }
  ),

  // ——— Mutton ———
  muttonDish("Mutton Rogan Josh"),
  r(
    "Mutton Biryani",
    "dinner",
    [
      { name: "mutton", quantity: "400g" },
      { name: "rice", quantity: "300g" },
      { name: "onion", quantity: "150g" },
      { name: "curd", quantity: "80g" },
      { name: "ghee", quantity: "2 tbsp" },
      { name: "garam masala", quantity: "1 tsp" },
      ...spice,
    ],
    { tags: ["biryani", "mutton"], cookTime: 60 }
  ),
  r(
    "Keema Matar",
    "dinner",
    [
      { name: "keema", quantity: "300g" },
      { name: "peas", quantity: "100g" },
      ...tadkaBase,
    ],
    { tags: ["keema"] }
  ),

  // ——— Fish ———
  fishDish("Fish Curry"),
  r(
    "Fish Fry",
    "dinner",
    [
      { name: "fish", quantity: "400g" },
      { name: "turmeric", quantity: "1/2 tsp" },
      { name: "chilli powder", quantity: "1 tsp" },
      { name: "lemon", quantity: "1" },
      { name: "mustard oil", quantity: "for frying" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["fish", "fry"], cookTime: 20 }
  ),
  r(
    "Fish Tikka",
    "snack",
    [
      { name: "fish", quantity: "300g" },
      { name: "curd", quantity: "60g" },
      { name: "lemon", quantity: "1" },
      ...spice,
    ],
    { tags: ["fish", "tikka"] }
  ),

  // ——— Rice ———
  riceDish("Jeera Rice"),
  riceDish("Peas Pulao", ["peas"]),
  riceDish("Vegetable Pulao", ["carrot", "peas", "beans"]),
  r(
    "Lemon Rice",
    "lunch",
    [
      { name: "rice", quantity: "200g" },
      { name: "lemon", quantity: "1" },
      { name: "mustard seeds", quantity: "1/2 tsp" },
      { name: "peanut", quantity: "30g" },
      { name: "turmeric", quantity: "1/4 tsp" },
      { name: "cooking oil", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["south-indian", "rice"] }
  ),
  r(
    "Tamarind Rice",
    "lunch",
    [
      { name: "rice", quantity: "200g" },
      { name: "tamarind", quantity: "2 tbsp" },
      { name: "peanut", quantity: "30g" },
      { name: "mustard seeds", quantity: "1/2 tsp" },
      { name: "cooking oil", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["south-indian"] }
  ),
  r(
    "Curd Rice",
    "lunch",
    [
      { name: "rice", quantity: "150g" },
      { name: "curd", quantity: "200g" },
      { name: "mustard seeds", quantity: "1/2 tsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["south-indian", "comfort"] }
  ),
  riceDish("Tomato Rice", ["tomato"]),
  r(
    "Coconut Rice",
    "lunch",
    [
      { name: "rice", quantity: "200g" },
      { name: "coconut", quantity: "80g" },
      { name: "mustard seeds", quantity: "1/2 tsp" },
      { name: "cooking oil", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["south-indian"] }
  ),
  r(
    "Veg Fried Rice",
    "lunch",
    [
      { name: "rice", quantity: "200g" },
      { name: "carrot", quantity: "50g" },
      { name: "beans", quantity: "50g" },
      { name: "capsicum", quantity: "50g" },
      { name: "cooking oil", quantity: "2 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["fried-rice"] }
  ),
  r(
    "Chicken Fried Rice",
    "dinner",
    [
      { name: "rice", quantity: "200g" },
      { name: "chicken", quantity: "150g" },
      { name: "egg", quantity: "1" },
      { name: "onion", quantity: "50g" },
      { name: "cooking oil", quantity: "2 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["fried-rice"] }
  ),
  r(
    "Vegetable Biryani",
    "dinner",
    [
      { name: "rice", quantity: "250g" },
      { name: "potato", quantity: "100g" },
      { name: "carrot", quantity: "80g" },
      { name: "peas", quantity: "80g" },
      { name: "curd", quantity: "50g" },
      { name: "ghee", quantity: "2 tbsp" },
      ...spice,
    ],
    { tags: ["biryani", "veg"] }
  ),
  r(
    "Paneer Biryani",
    "dinner",
    [
      { name: "rice", quantity: "250g" },
      { name: "paneer", quantity: "200g" },
      { name: "onion", quantity: "100g" },
      { name: "curd", quantity: "50g" },
      { name: "ghee", quantity: "2 tbsp" },
      ...spice,
    ],
    { tags: ["biryani", "paneer"] }
  ),
  // ——— Roti / Bread ———
  rotiBread("Roti", "atta"),
  r(
    "Naan",
    "dinner",
    [
      { name: "maida", quantity: "200g" },
      { name: "curd", quantity: "50g" },
      { name: "butter", quantity: "20g" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["naan"] }
  ),
  r(
    "Butter Naan",
    "dinner",
    [
      { name: "maida", quantity: "200g" },
      { name: "curd", quantity: "50g" },
      { name: "butter", quantity: "40g" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["naan"] }
  ),
  r(
    "Garlic Naan",
    "dinner",
    [
      { name: "maida", quantity: "200g" },
      { name: "garlic", quantity: "15g" },
      { name: "butter", quantity: "30g" },
      { name: "curd", quantity: "40g" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["naan"] }
  ),
  r(
    "Laccha Paratha",
    "lunch",
    [
      { name: "atta", quantity: "200g" },
      { name: "ghee", quantity: "3 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["paratha"] }
  ),
  r(
    "Plain Paratha",
    "breakfast",
    [
      { name: "atta", quantity: "200g" },
      { name: "ghee", quantity: "2 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["paratha"] }
  ),
  rotiBread("Bajra Roti", "bajra"),
  rotiBread("Jowar Roti", "jowar"),
  rotiBread("Makki Ki Roti", "makki"),
  rotiBread("Rumali Roti", "maida"),
  r(
    "Kulcha",
    "lunch",
    [
      { name: "maida", quantity: "200g" },
      { name: "curd", quantity: "40g" },
      { name: "butter", quantity: "20g" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["kulcha"] }
  ),
  r(
    "Amritsari Kulcha",
    "lunch",
    [
      { name: "maida", quantity: "200g" },
      { name: "potato", quantity: "150g" },
      { name: "onion", quantity: "40g" },
      { name: "butter", quantity: "20g" },
      ...spice,
    ],
    { tags: ["kulcha", "punjabi"] }
  ),

  // ——— Light / Comfort ———
  r(
    "Khichdi",
    "dinner",
    [
      { name: "rice", quantity: "100g" },
      { name: "dal", quantity: "80g" },
      { name: "turmeric", quantity: "1/4 tsp" },
      { name: "cumin", quantity: "1/2 tsp" },
      { name: "ghee", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["khichdi", "comfort"] }
  ),
  r(
    "Moong Dal Khichdi",
    "dinner",
    [
      { name: "rice", quantity: "100g" },
      { name: "moong dal", quantity: "80g" },
      { name: "ghee", quantity: "1 tbsp" },
      { name: "cumin", quantity: "1/2 tsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["khichdi"] }
  ),
  r(
    "Masala Khichdi",
    "dinner",
    [
      { name: "rice", quantity: "100g" },
      { name: "dal", quantity: "80g" },
      { name: "onion", quantity: "50g" },
      { name: "tomato", quantity: "50g" },
      { name: "ghee", quantity: "1 tbsp" },
      ...spice,
    ],
    { tags: ["khichdi"] }
  ),
  r(
    "Vegetable Khichdi",
    "dinner",
    [
      { name: "rice", quantity: "100g" },
      { name: "dal", quantity: "80g" },
      { name: "carrot", quantity: "50g" },
      { name: "peas", quantity: "50g" },
      { name: "ghee", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["khichdi"] }
  ),
  r(
    "Dalia",
    "breakfast",
    [
      { name: "dalia", quantity: "100g" },
      { name: "milk", quantity: "200ml" },
      { name: "sugar", quantity: "2 tbsp" },
    ],
    { tags: ["dalia", "comfort"] }
  ),
  r(
    "Vegetable Dalia",
    "lunch",
    [
      { name: "dalia", quantity: "100g" },
      { name: "carrot", quantity: "50g" },
      { name: "peas", quantity: "50g" },
      { name: "onion", quantity: "40g" },
      { name: "ghee", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["dalia"] }
  ),
  r(
    "Kadhi Rice",
    "lunch",
    [
      { name: "besan", quantity: "80g" },
      { name: "curd", quantity: "200g" },
      { name: "rice", quantity: "150g" },
      { name: "cumin", quantity: "1/2 tsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["kadhi", "comfort"] }
  ),
  r(
    "Dal Roti",
    "lunch",
    [
      { name: "dal", quantity: "120g" },
      { name: "atta", quantity: "200g" },
      { name: "ghee", quantity: "1 tbsp" },
      ...spice,
    ],
    { tags: ["comfort"] }
  ),
  r(
    "Aloo Roti",
    "lunch",
    [
      { name: "potato", quantity: "150g" },
      { name: "atta", quantity: "150g" },
      { name: "ghee", quantity: "1 tbsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["comfort"] }
  ),
  r(
    "Vegetable Soup",
    "dinner",
    [
      { name: "carrot", quantity: "80g" },
      { name: "beans", quantity: "50g" },
      { name: "cabbage", quantity: "50g" },
      { name: "salt", quantity: "to taste" },
      { name: "black pepper", quantity: "pinch" },
    ],
    { tags: ["soup", "light"], cookTime: 20 }
  ),
  r(
    "Tomato Soup",
    "dinner",
    [
      { name: "tomato", quantity: "300g" },
      { name: "onion", quantity: "40g" },
      { name: "butter", quantity: "10g" },
      { name: "salt", quantity: "to taste" },
      { name: "black pepper", quantity: "pinch" },
    ],
    { tags: ["soup"] }
  ),
  r(
    "Palak Soup",
    "dinner",
    [
      { name: "spinach", quantity: "200g" },
      { name: "garlic", quantity: "10g" },
      { name: "butter", quantity: "10g" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["soup"] }
  ),
  r(
    "Sprouts Chaat",
    "snack",
    [
      { name: "sprouts", quantity: "150g" },
      { name: "onion", quantity: "40g" },
      { name: "tomato", quantity: "40g" },
      { name: "lemon", quantity: "1" },
      { name: "cumin", quantity: "1/2 tsp" },
      { name: "salt", quantity: "to taste" },
    ],
    { tags: ["chaat", "healthy"] }
  ),

  // ——— Snacks ———
  snack("Samosa", [
    { name: "maida", quantity: "150g" },
    { name: "potato", quantity: "200g" },
    { name: "peas", quantity: "50g" },
    { name: "cooking oil", quantity: "for frying" },
    ...spice,
  ]),
  snack("Onion Pakora", [
    { name: "besan", quantity: "150g" },
    { name: "onion", quantity: "200g" },
    { name: "cooking oil", quantity: "for frying" },
    ...spice,
  ]),
  snack("Aloo Pakora", [
    { name: "besan", quantity: "100g" },
    { name: "potato", quantity: "200g" },
    { name: "cooking oil", quantity: "for frying" },
    ...spice,
  ]),
  snack("Paneer Pakora", [
    { name: "besan", quantity: "100g" },
    { name: "paneer", quantity: "200g" },
    { name: "cooking oil", quantity: "for frying" },
    ...spice,
  ]),
  snack("Mirchi Pakora", [
    { name: "besan", quantity: "100g" },
    { name: "green chilli", quantity: "8" },
    { name: "cooking oil", quantity: "for frying" },
    { name: "salt", quantity: "to taste" },
  ]),
  snack("Gobi Pakora", [
    { name: "besan", quantity: "100g" },
    { name: "cauliflower", quantity: "200g" },
    { name: "cooking oil", quantity: "for frying" },
    ...spice,
  ]),
  snack("Aloo Kachori", [
    { name: "maida", quantity: "150g" },
    { name: "potato", quantity: "150g" },
    { name: "cooking oil", quantity: "for frying" },
    ...spice,
  ]),
  snack("Pyaz Kachori", [
    { name: "maida", quantity: "150g" },
    { name: "onion", quantity: "150g" },
    { name: "cooking oil", quantity: "for frying" },
    ...spice,
  ]),
  snack("Dahi Vada", [
    { name: "urad dal", quantity: "150g" },
    { name: "curd", quantity: "250g" },
    { name: "cumin", quantity: "1/2 tsp" },
    { name: "salt", quantity: "to taste" },
  ]),
  snack("Dahi Puri", [
    { name: "puri shells", quantity: "12" },
    { name: "curd", quantity: "150g" },
    { name: "potato", quantity: "100g" },
    { name: "onion", quantity: "40g" },
    { name: "sev", quantity: "30g" },
    { name: "cumin", quantity: "1/2 tsp" },
  ]),
  snack("Bhel Puri", [
    { name: "puffed rice", quantity: "100g" },
    { name: "onion", quantity: "50g" },
    { name: "tomato", quantity: "50g" },
    { name: "sev", quantity: "40g" },
    { name: "lemon", quantity: "1" },
    { name: "salt", quantity: "to taste" },
  ]),
  snack("Sev Puri", [
    { name: "papdi", quantity: "12" },
    { name: "potato", quantity: "100g" },
    { name: "onion", quantity: "40g" },
    { name: "sev", quantity: "40g" },
    { name: "curd", quantity: "80g" },
  ]),
  snack("Pani Puri", [
    { name: "puri shells", quantity: "16" },
    { name: "potato", quantity: "100g" },
    { name: "sprouts", quantity: "50g" },
    { name: "cumin", quantity: "1 tsp" },
    { name: "tamarind", quantity: "1 tbsp" },
    { name: "salt", quantity: "to taste" },
  ]),
  snack("Aloo Chaat", [
    { name: "potato", quantity: "200g" },
    { name: "onion", quantity: "40g" },
    { name: "tomato", quantity: "40g" },
    { name: "lemon", quantity: "1" },
    { name: "cumin", quantity: "1/2 tsp" },
    { name: "salt", quantity: "to taste" },
  ]),
  snack("Papdi Chaat", [
    { name: "papdi", quantity: "12" },
    { name: "potato", quantity: "100g" },
    { name: "curd", quantity: "150g" },
    { name: "sev", quantity: "30g" },
    { name: "cumin", quantity: "1/2 tsp" },
  ]),
  snack("Samosa Chaat", [
    { name: "samosa", quantity: "2" },
    { name: "curd", quantity: "100g" },
    { name: "onion", quantity: "40g" },
    { name: "sev", quantity: "30g" },
    { name: "chole", quantity: "80g" },
  ]),
  snack("Corn Chaat", [
    { name: "corn", quantity: "150g" },
    { name: "onion", quantity: "40g" },
    { name: "tomato", quantity: "40g" },
    { name: "lemon", quantity: "1" },
    { name: "salt", quantity: "to taste" },
  ]),
  snack("Fruit Chaat", [
    { name: "apple", quantity: "80g" },
    { name: "banana", quantity: "80g" },
    { name: "orange", quantity: "80g" },
    { name: "lemon", quantity: "1" },
    { name: "cumin", quantity: "1/2 tsp" },
    { name: "salt", quantity: "to taste" },
  ]),
  snack("Masala Makhana", [
    { name: "makhana", quantity: "100g" },
    { name: "ghee", quantity: "1 tbsp" },
    { name: "chilli powder", quantity: "1/4 tsp" },
    { name: "salt", quantity: "to taste" },
  ]),
  snack("Peanut Chaat", [
    { name: "peanut", quantity: "100g" },
    { name: "onion", quantity: "40g" },
    { name: "tomato", quantity: "40g" },
    { name: "lemon", quantity: "1" },
    { name: "salt", quantity: "to taste" },
  ]),

  // ——— Desserts ———
  dessert("Kheer", [
    { name: "rice", quantity: "50g" },
    { name: "milk", quantity: "500ml" },
    { name: "sugar", quantity: "4 tbsp" },
    { name: "cardamom", quantity: "2 pods" },
  ]),
  dessert("Seviyan", [
    { name: "seviyan", quantity: "80g" },
    { name: "milk", quantity: "400ml" },
    { name: "sugar", quantity: "3 tbsp" },
    { name: "ghee", quantity: "1 tbsp" },
  ]),
  dessert("Gajar Ka Halwa", [
    { name: "carrot", quantity: "400g" },
    { name: "milk", quantity: "300ml" },
    { name: "sugar", quantity: "4 tbsp" },
    { name: "ghee", quantity: "2 tbsp" },
  ]),
  dessert("Moong Dal Halwa", [
    { name: "moong dal", quantity: "150g" },
    { name: "ghee", quantity: "80g" },
    { name: "sugar", quantity: "100g" },
    { name: "milk", quantity: "100ml" },
  ]),
  dessert("Suji Halwa", [
    { name: "rava", quantity: "100g" },
    { name: "ghee", quantity: "50g" },
    { name: "sugar", quantity: "80g" },
  ]),
  dessert("Besan Halwa", [
    { name: "besan", quantity: "100g" },
    { name: "ghee", quantity: "50g" },
    { name: "sugar", quantity: "80g" },
  ]),
  dessert("Atta Halwa", [
    { name: "atta", quantity: "100g" },
    { name: "ghee", quantity: "50g" },
    { name: "sugar", quantity: "80g" },
  ]),
  dessert("Gulab Jamun", [
    { name: "milk powder", quantity: "100g" },
    { name: "maida", quantity: "30g" },
    { name: "sugar", quantity: "200g" },
    { name: "ghee", quantity: "for frying" },
  ]),
  dessert("Rasgulla", [
    { name: "milk", quantity: "1L" },
    { name: "lemon", quantity: "1" },
    { name: "sugar", quantity: "200g" },
  ]),
  dessert("Rasmalai", [
    { name: "milk", quantity: "1L" },
    { name: "sugar", quantity: "150g" },
    { name: "cardamom", quantity: "2 pods" },
  ]),
  dessert("Jalebi", [
    { name: "maida", quantity: "150g" },
    { name: "sugar", quantity: "200g" },
    { name: "cooking oil", quantity: "for frying" },
  ]),
  dessert("Imarti", [
    { name: "urad dal", quantity: "150g" },
    { name: "sugar", quantity: "200g" },
    { name: "ghee", quantity: "for frying" },
  ]),
  dessert("Besan Ladoo", [
    { name: "besan", quantity: "200g" },
    { name: "ghee", quantity: "80g" },
    { name: "sugar", quantity: "100g" },
  ]),
  dessert("Coconut Ladoo", [
    { name: "coconut", quantity: "200g" },
    { name: "milk", quantity: "100ml" },
    { name: "sugar", quantity: "80g" },
  ]),
  dessert("Peda", [
    { name: "milk", quantity: "1L" },
    { name: "sugar", quantity: "100g" },
    { name: "ghee", quantity: "1 tbsp" },
  ]),
  dessert("Barfi", [
    { name: "milk", quantity: "1L" },
    { name: "sugar", quantity: "120g" },
    { name: "ghee", quantity: "2 tbsp" },
  ]),
  dessert("Kaju Katli", [
    { name: "cashew", quantity: "200g" },
    { name: "sugar", quantity: "100g" },
    { name: "ghee", quantity: "1 tsp" },
  ]),
  dessert("Shrikhand", [
    { name: "curd", quantity: "400g" },
    { name: "sugar", quantity: "80g" },
    { name: "cardamom", quantity: "2 pods" },
  ]),
  dessert("Phirni", [
    { name: "rice", quantity: "40g" },
    { name: "milk", quantity: "500ml" },
    { name: "sugar", quantity: "4 tbsp" },
  ]),
  dessert("Kulfi", [
    { name: "milk", quantity: "500ml" },
    { name: "sugar", quantity: "4 tbsp" },
    { name: "cream", quantity: "50g" },
  ]),
  dessert("Mango Shrikhand", [
    { name: "curd", quantity: "300g" },
    { name: "mango", quantity: "150g" },
    { name: "sugar", quantity: "60g" },
  ]),

  // ——— Drinks ———
  drink("Masala Chai", [
    { name: "tea", quantity: "2 tsp" },
    { name: "milk", quantity: "200ml" },
    { name: "ginger", quantity: "5g" },
    { name: "cardamom", quantity: "2 pods" },
    { name: "sugar", quantity: "to taste" },
  ]),
  drink("Ginger Tea", [
    { name: "tea", quantity: "2 tsp" },
    { name: "ginger", quantity: "10g" },
    { name: "milk", quantity: "100ml" },
    { name: "sugar", quantity: "to taste" },
  ]),
  drink("Elaichi Tea", [
    { name: "tea", quantity: "2 tsp" },
    { name: "cardamom", quantity: "3 pods" },
    { name: "milk", quantity: "150ml" },
    { name: "sugar", quantity: "to taste" },
  ]),
  drink("Lemon Tea", [
    { name: "tea", quantity: "2 tsp" },
    { name: "lemon", quantity: "1" },
    { name: "sugar", quantity: "to taste" },
  ]),
  drink("Cold Coffee", [
    { name: "coffee", quantity: "2 tsp" },
    { name: "milk", quantity: "250ml" },
    { name: "sugar", quantity: "2 tbsp" },
  ]),
  drink("Lassi", [
    { name: "curd", quantity: "300g" },
    { name: "sugar", quantity: "2 tbsp" },
    { name: "water", quantity: "100ml" },
  ]),
  drink("Mango Lassi", [
    { name: "curd", quantity: "250g" },
    { name: "mango", quantity: "150g" },
    { name: "sugar", quantity: "2 tbsp" },
  ]),
  drink("Chaas", [
    { name: "curd", quantity: "200g" },
    { name: "water", quantity: "200ml" },
    { name: "cumin", quantity: "1/2 tsp" },
    { name: "salt", quantity: "to taste" },
  ]),
  drink("Masala Chaas", [
    { name: "curd", quantity: "200g" },
    { name: "water", quantity: "200ml" },
    { name: "cumin", quantity: "1/2 tsp" },
    { name: "ginger", quantity: "5g" },
    { name: "salt", quantity: "to taste" },
  ]),
  drink("Jaljeera", [
    { name: "cumin", quantity: "1 tsp" },
    { name: "lemon", quantity: "1" },
    { name: "mint", quantity: "handful" },
    { name: "salt", quantity: "to taste" },
    { name: "water", quantity: "500ml" },
  ]),
  drink("Nimbu Pani", [
    { name: "lemon", quantity: "2" },
    { name: "sugar", quantity: "2 tbsp" },
    { name: "salt", quantity: "pinch" },
    { name: "water", quantity: "500ml" },
  ]),
  drink("Aam Panna", [
    { name: "mango", quantity: "200g" },
    { name: "sugar", quantity: "3 tbsp" },
    { name: "cumin", quantity: "1/2 tsp" },
    { name: "salt", quantity: "to taste" },
    { name: "water", quantity: "500ml" },
  ]),
];

function ingredientFingerprint(recipe: SeedRecipe): string {
  return recipe.ingredients
    .map((ing) => ing.name.trim().toLowerCase())
    .filter(Boolean)
    .sort()
    .join("|");
}

/** Deduplicate by title and by identical ingredient set (keep first) */
export function getUniqueIndianRecipes(): SeedRecipe[] {
  const seenTitles = new Set<string>();
  const seenIngredients = new Set<string>();
  const unique: SeedRecipe[] = [];

  for (const recipe of INDIAN_RECIPES) {
    const titleKey = recipe.title.trim().toLowerCase();
    const ingredientKey = ingredientFingerprint(recipe);
    if (seenTitles.has(titleKey) || seenIngredients.has(ingredientKey)) {
      continue;
    }
    seenTitles.add(titleKey);
    seenIngredients.add(ingredientKey);
    unique.push(recipe);
  }

  return unique;
}

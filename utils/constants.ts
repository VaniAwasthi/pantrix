export const APP_NAME = "Pantrix";

export const PANTRY_CATEGORIES = [
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "dairy", label: "Dairy" },
  { value: "biscuits", label: "Biscuits" },
  { value: "namkeen", label: "Namkeen" },
  { value: "breads", label: "Breads" },
  { value: "grains", label: "Grains & Pasta" },
  { value: "spices", label: "Spices" },
  { value: "nuts", label: "Nuts & Seeds" },
  { value: "oils", label: "Oils" },
  { value: "protein", label: "Eggs & Protein" },
  { value: "beverages", label: "Beverages" },
  { value: "other", label: "Other" },
] as const;

export const UNITS = [
  "g",
  "packet",
  "L",
  "ml",
  "kg",
  "pcs",
] as const;

export const EXPIRY_WARNING_DAYS = 3;

export const AUTH_COOKIE_NAME = "pantrix-token";

export const PROTECTED_ROUTES = [
  "/dashboard",
  "/pantry",
  "/recipes",
  "/setup",
  "/shopping",
  "/nutrition",
];

export const AUTH_ROUTES = ["/login", "/register"];

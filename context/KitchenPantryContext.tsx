"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type {
  CatalogIngredient,
  GroceryCategory,
  GroceryUnit,
  PantryGroceryItem,
} from "@/components/groceries/groceries-data";
import { groceryCatalog } from "@/components/groceries/groceries-data";
import type { PantryItem } from "@/types/pantry";

export const KITCHEN_PANTRY_STORAGE_KEY = "pantrix-kitchen-pantry";

export type KitchenPantryItem = PantryGroceryItem & {
  serverId?: string;
};

type KitchenPantryState = {
  items: KitchenPantryItem[];
  hydrated: boolean;
};

type KitchenPantryAction =
  | { type: "HYDRATE"; items: KitchenPantryItem[] }
  | { type: "ADD_ITEM"; item: KitchenPantryItem }
  | { type: "ADD_FROM_CATALOG"; item: CatalogIngredient }
  | { type: "TOGGLE_CATALOG"; item: CatalogIngredient }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "SET_ITEMS"; items: KitchenPantryItem[] }
  | { type: "MERGE_ITEMS"; items: KitchenPantryItem[] }
  | { type: "LINK_SERVER_ID"; id: string; serverId: string }
  | { type: "CLEAR" };

const initialState: KitchenPantryState = {
  items: [],
  hydrated: false,
};

const VALID_CATEGORIES = new Set([
  "vegetables",
  "fruits",
  "dairy",
  "grains",
  "pulses",
  "spices",
  "protein",
  "other",
]);

const VALID_UNITS = new Set([
  "pieces",
  "g",
  "kg",
  "ml",
  "L",
  "packet",
  "cups",
  "pcs",
]);

function normalizeCategory(
  category: string
): Exclude<GroceryCategory, "all"> {
  if (VALID_CATEGORIES.has(category)) {
    return category as Exclude<GroceryCategory, "all">;
  }
  return "other";
}

function normalizeUnit(unit: string): GroceryUnit {
  if (unit === "pcs") return "pieces";
  if (VALID_UNITS.has(unit)) return unit as GroceryUnit;
  return "pieces";
}

function mergeById(
  base: KitchenPantryItem[],
  incoming: KitchenPantryItem[]
): KitchenPantryItem[] {
  const map = new Map<string, KitchenPantryItem>();
  for (const item of base) map.set(item.id, item);
  for (const item of incoming) {
    const existing = map.get(item.id);
    map.set(item.id, existing ? { ...existing, ...item } : item);
  }
  return [...map.values()];
}

function kitchenPantryReducer(
  state: KitchenPantryState,
  action: KitchenPantryAction
): KitchenPantryState {
  switch (action.type) {
    case "HYDRATE": {
      // Keep anything already selected before storage finished loading
      const merged = mergeById(action.items, state.items);
      return { items: merged, hydrated: true };
    }

    case "ADD_FROM_CATALOG": {
      if (state.items.some((item) => item.id === action.item.id)) {
        return state;
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.item.id,
            name: action.item.name,
            emoji: action.item.emoji,
            category: action.item.category,
            quantity: action.item.defaultQuantity,
            unit: action.item.defaultUnit,
          },
        ],
      };
    }

    case "TOGGLE_CATALOG": {
      if (state.items.some((item) => item.id === action.item.id)) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.item.id),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.item.id,
            name: action.item.name,
            emoji: action.item.emoji,
            category: action.item.category,
            quantity: action.item.defaultQuantity,
            unit: action.item.defaultUnit,
          },
        ],
      };
    }

    case "ADD_ITEM": {
      if (state.items.some((item) => item.id === action.item.id)) {
        return state;
      }
      const sameName = state.items.find(
        (item) => item.name.toLowerCase() === action.item.name.toLowerCase()
      );
      if (sameName) return state;
      return { ...state, items: [...state.items, action.item] };
    }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: Math.max(1, action.quantity) }
            : item
        ),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };

    case "SET_ITEMS":
      return { ...state, items: action.items };

    case "MERGE_ITEMS":
      return { ...state, items: mergeById(state.items, action.items) };

    case "LINK_SERVER_ID":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, serverId: action.serverId }
            : item
        ),
      };

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function pantryApiItemToKitchen(item: PantryItem): KitchenPantryItem {
  const catalog = groceryCatalog.find(
    (entry) => entry.name.toLowerCase() === item.name.toLowerCase()
  );

  return {
    id: catalog?.id ?? `server-${item.id}`,
    serverId: item.id,
    name: item.name,
    emoji: catalog?.emoji ?? "🧺",
    category: catalog?.category ?? normalizeCategory(item.category),
    quantity: item.quantity,
    unit: catalog?.defaultUnit ?? normalizeUnit(item.unit),
  };
}

function readStoredItems(): KitchenPantryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KITCHEN_PANTRY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as KitchenPantryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function persistKitchenPantry(items: KitchenPantryItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    KITCHEN_PANTRY_STORAGE_KEY,
    JSON.stringify(items)
  );
}

function defaultExpiryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 10);
}

type KitchenPantryContextValue = {
  items: KitchenPantryItem[];
  hydrated: boolean;
  itemIds: Set<string>;
  addFromCatalog: (item: CatalogIngredient) => void;
  toggleCatalog: (item: CatalogIngredient) => void;
  addItem: (item: KitchenPantryItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  setItems: (items: KitchenPantryItem[]) => void;
  mergeItems: (items: KitchenPantryItem[]) => void;
  linkServerId: (id: string, serverId: string) => void;
  clear: () => void;
  syncToApi: () => Promise<void>;
};

const KitchenPantryContext = createContext<KitchenPantryContextValue | null>(
  null
);

export function KitchenPantryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(kitchenPantryReducer, initialState);
  const itemsRef = useRef(state.items);
  itemsRef.current = state.items;

  useEffect(() => {
    dispatch({ type: "HYDRATE", items: readStoredItems() });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    persistKitchenPantry(state.items);
  }, [state.hydrated, state.items]);

  const addFromCatalog = useCallback((item: CatalogIngredient) => {
    dispatch({ type: "ADD_FROM_CATALOG", item });
  }, []);

  const toggleCatalog = useCallback((item: CatalogIngredient) => {
    dispatch({ type: "TOGGLE_CATALOG", item });
  }, []);

  const addItem = useCallback((item: KitchenPantryItem) => {
    dispatch({ type: "ADD_ITEM", item });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", id });
  }, []);

  const setItems = useCallback((items: KitchenPantryItem[]) => {
    dispatch({ type: "SET_ITEMS", items });
  }, []);

  const mergeItems = useCallback((items: KitchenPantryItem[]) => {
    dispatch({ type: "MERGE_ITEMS", items });
  }, []);

  const linkServerId = useCallback((id: string, serverId: string) => {
    dispatch({ type: "LINK_SERVER_ID", id, serverId });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const syncToApi = useCallback(async () => {
    const current = itemsRef.current;
    persistKitchenPantry(current);

    for (const item of current) {
      if (item.serverId) continue;

      try {
        const res = await fetch("/api/pantry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: item.name,
            quantity: item.quantity,
            unit: item.unit === "pieces" ? "pcs" : item.unit,
            category: item.category,
            expiryDate: defaultExpiryDate(),
          }),
        });

        if (!res.ok) continue;
        const data = await res.json();
        if (data.item?.id) {
          dispatch({
            type: "LINK_SERVER_ID",
            id: item.id,
            serverId: data.item.id,
          });
        }
      } catch {
        // Keep local selection even if API fails
      }
    }
  }, []);

  const itemIds = useMemo(
    () => new Set(state.items.map((item) => item.id)),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      hydrated: state.hydrated,
      itemIds,
      addFromCatalog,
      toggleCatalog,
      addItem,
      updateQuantity,
      removeItem,
      setItems,
      mergeItems,
      linkServerId,
      clear,
      syncToApi,
    }),
    [
      state.items,
      state.hydrated,
      itemIds,
      addFromCatalog,
      toggleCatalog,
      addItem,
      updateQuantity,
      removeItem,
      setItems,
      mergeItems,
      linkServerId,
      clear,
      syncToApi,
    ]
  );

  return (
    <KitchenPantryContext.Provider value={value}>
      {children}
    </KitchenPantryContext.Provider>
  );
}

export function useKitchenPantry() {
  const ctx = useContext(KitchenPantryContext);
  if (!ctx) {
    throw new Error(
      "useKitchenPantry must be used within KitchenPantryProvider"
    );
  }
  return ctx;
}

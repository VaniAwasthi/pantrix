"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type {
  CookingTimeId,
  CuisinePreferenceId,
  DietPreferenceId,
  FoodPreferenceId,
  NutritionGoalId,
} from "@/components/setup/setup-data";

export const PREFERENCES_STORAGE_KEY = "pantrix-kitchen-preferences";

export type KitchenPreferences = {
  diets: DietPreferenceId[];
  foods: FoodPreferenceId[];
  cuisines: CuisinePreferenceId[];
  cookingTime: CookingTimeId | null;
  nutritionGoal: NutritionGoalId | null;
};

type PreferencesState = KitchenPreferences & {
  hydrated: boolean;
};

type PreferencesAction =
  | { type: "HYDRATE"; prefs: KitchenPreferences }
  | { type: "SET_PREFERENCES"; prefs: Partial<KitchenPreferences> }
  | { type: "TOGGLE_DIET"; id: DietPreferenceId }
  | { type: "TOGGLE_FOOD"; id: FoodPreferenceId }
  | { type: "TOGGLE_CUISINE"; id: CuisinePreferenceId }
  | { type: "SET_COOKING_TIME"; id: CookingTimeId | null }
  | { type: "SET_NUTRITION_GOAL"; id: NutritionGoalId | null };

const defaultPrefs: KitchenPreferences = {
  diets: [],
  foods: [],
  cuisines: ["indian"],
  cookingTime: null,
  nutritionGoal: null,
};

const initialState: PreferencesState = {
  ...defaultPrefs,
  hydrated: false,
};

function toggleInList<T>(list: T[], id: T): T[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

function preferencesReducer(
  state: PreferencesState,
  action: PreferencesAction
): PreferencesState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.prefs, hydrated: true };
    case "SET_PREFERENCES":
      return { ...state, ...action.prefs };
    case "TOGGLE_DIET":
      return { ...state, diets: toggleInList(state.diets, action.id) };
    case "TOGGLE_FOOD":
      return { ...state, foods: toggleInList(state.foods, action.id) };
    case "TOGGLE_CUISINE":
      return { ...state, cuisines: toggleInList(state.cuisines, action.id) };
    case "SET_COOKING_TIME":
      return { ...state, cookingTime: action.id };
    case "SET_NUTRITION_GOAL":
      return { ...state, nutritionGoal: action.id };
    default:
      return state;
  }
}

function readStored(): KitchenPreferences {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw) as Partial<KitchenPreferences>;
    return {
      diets: parsed.diets ?? [],
      foods: parsed.foods ?? [],
      cuisines: parsed.cuisines?.length ? parsed.cuisines : ["indian"],
      cookingTime: parsed.cookingTime ?? null,
      nutritionGoal: parsed.nutritionGoal ?? null,
    };
  } catch {
    return defaultPrefs;
  }
}

export function persistPreferences(prefs: KitchenPreferences) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(prefs));
}

type PreferencesContextValue = {
  preferences: KitchenPreferences;
  hydrated: boolean;
  toggleDiet: (id: DietPreferenceId) => void;
  toggleFood: (id: FoodPreferenceId) => void;
  toggleCuisine: (id: CuisinePreferenceId) => void;
  setCookingTime: (id: CookingTimeId | null) => void;
  setNutritionGoal: (id: NutritionGoalId | null) => void;
  savePreferences: (prefs?: Partial<KitchenPreferences>) => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function KitchenPreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(preferencesReducer, initialState);

  useEffect(() => {
    dispatch({ type: "HYDRATE", prefs: readStored() });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    persistPreferences({
      diets: state.diets,
      foods: state.foods,
      cuisines: state.cuisines,
      cookingTime: state.cookingTime,
      nutritionGoal: state.nutritionGoal,
    });
  }, [state]);

  const toggleDiet = useCallback((id: DietPreferenceId) => {
    dispatch({ type: "TOGGLE_DIET", id });
  }, []);
  const toggleFood = useCallback((id: FoodPreferenceId) => {
    dispatch({ type: "TOGGLE_FOOD", id });
  }, []);
  const toggleCuisine = useCallback((id: CuisinePreferenceId) => {
    dispatch({ type: "TOGGLE_CUISINE", id });
  }, []);
  const setCookingTime = useCallback((id: CookingTimeId | null) => {
    dispatch({ type: "SET_COOKING_TIME", id });
  }, []);
  const setNutritionGoal = useCallback((id: NutritionGoalId | null) => {
    dispatch({ type: "SET_NUTRITION_GOAL", id });
  }, []);
  const savePreferences = useCallback(
    (prefs?: Partial<KitchenPreferences>) => {
      if (prefs) dispatch({ type: "SET_PREFERENCES", prefs });
      persistPreferences({
        diets: prefs?.diets ?? state.diets,
        foods: prefs?.foods ?? state.foods,
        cuisines: prefs?.cuisines ?? state.cuisines,
        cookingTime:
          prefs?.cookingTime !== undefined
            ? prefs.cookingTime
            : state.cookingTime,
        nutritionGoal:
          prefs?.nutritionGoal !== undefined
            ? prefs.nutritionGoal
            : state.nutritionGoal,
      });
    },
    [state]
  );

  const preferences = useMemo(
    () => ({
      diets: state.diets,
      foods: state.foods,
      cuisines: state.cuisines,
      cookingTime: state.cookingTime,
      nutritionGoal: state.nutritionGoal,
    }),
    [state]
  );

  const value = useMemo(
    () => ({
      preferences,
      hydrated: state.hydrated,
      toggleDiet,
      toggleFood,
      toggleCuisine,
      setCookingTime,
      setNutritionGoal,
      savePreferences,
    }),
    [
      preferences,
      state.hydrated,
      toggleDiet,
      toggleFood,
      toggleCuisine,
      setCookingTime,
      setNutritionGoal,
      savePreferences,
    ]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function useKitchenPreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error(
      "useKitchenPreferences must be used within KitchenPreferencesProvider"
    );
  }
  return ctx;
}

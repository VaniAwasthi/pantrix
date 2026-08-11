import { RecipeCard } from "./RecipeCard";
import type { MockRecipe } from "./discover-data";

interface RecipeGridProps {
  recipes: MockRecipe[];
  onToggleFavourite?: (id: string) => void;
  onAddMissing?: (id: string) => void;
}

export function RecipeGrid({
  recipes,
  onToggleFavourite,
  onAddMissing,
}: RecipeGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onToggleFavourite={onToggleFavourite}
          onAddMissing={onAddMissing}
        />
      ))}
    </div>
  );
}

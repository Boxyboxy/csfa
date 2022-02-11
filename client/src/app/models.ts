export interface RecipeBasicDeets {
  id?: string;
  title: string;
}

export interface Recipe extends RecipeBasicDeets {
  image: string;
  instruction: string;
  ingredients: string[];
}

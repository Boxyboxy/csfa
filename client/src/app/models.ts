export interface RecipeBasicDeets {
  id: string;
  name: string;
}

export interface Recipe extends RecipeBasicDeets {
  title: string;
  image: string;
  instructions: string;
  ingredients: string[];
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RECIPES } from './mock-recipes';
import { RecipeBasicDeets } from './models';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpClient: HttpClient) {}

  getAllRecipes(): Observable<RecipeBasicDeets[]> {
    // return of(RECIPES);

    return this.httpClient.get<RecipeBasicDeets[]>(
      'http://localhost:8080/api/recipes'
    );
  }

  // getRecipe(recipeId: string): Observable<Recipe> {
  //   return;
  // }
}

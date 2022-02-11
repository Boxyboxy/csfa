import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RECIPES } from './mock-recipes';
import { Recipe, RecipeBasicDeets } from './models';

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

  getRecipe(recipeId: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(
      `http://localhost:8080/api/recipe/${recipeId}`
    );
  }

  saveRecipe(recipe: Recipe): Observable<any> {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    return this.httpClient.post(
      'http://localhost:8080/api/recipe',
      JSON.stringify(recipe),
      {
        headers: httpHeaders,
      }
    );
  }
}

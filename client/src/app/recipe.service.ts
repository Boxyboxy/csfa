import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable, of, throwError } from 'rxjs';
import { RECIPES } from './mock-recipes';
import { Recipe, RecipeBasicDeets } from './models';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpClient: HttpClient) {}

  getAllRecipes(): Observable<RecipeBasicDeets[]> {
    // return of(RECIPES);

    return this.httpClient.get<RecipeBasicDeets[]>('/api/recipes');
  }

  getRecipe(recipeId: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`/api/recipe/${recipeId}`);
  }

  saveRecipe(recipe: Recipe): Promise<any> {
    console.info('From my recipe service', recipe);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return lastValueFrom(
      this.httpClient.post('/api/recipe', recipe, httpOptions)
    );
  }
}

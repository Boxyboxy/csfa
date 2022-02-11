import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
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
    console.info('From my recipe service', recipe);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };

    return this.httpClient
      .post('http://localhost:8080/api/recipe', recipe, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}

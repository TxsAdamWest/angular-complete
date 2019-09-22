import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from 'app/recipes/recipe.service';

@Injectable({ // Remember that this is an optional / alternative way to provide a service to the entire app.
  providedIn: 'root' // Alternatively, I can add this to the providers array in app.module.ts
}) // This is however necessary for services which contain injected services.  Like HttpClientModule for example.
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  public storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://txs-ng-recipe-book.firebaseio.com/recipes.json', recipes) // Note about using PUT verb here, with firebase, it assumes you know what data you are storing and thus will not automatically add a rng UUID like when you use POST requests.
      .subscribe(response => {
        console.log(response);
      });
  }
}

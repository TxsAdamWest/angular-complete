import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public ingredientsChanged = new EventEmitter<Ingredient[]>();
  public startedEditing = new Subject<number>();
  
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  public newIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // Create a copy of the ingredients property array.
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}

import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipeBookComponent } from './recipes/recipes.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes'},
  { path: 'recipes', component: RecipeBookComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', redirectTo: '/not-found' } // catch invalid routes. MUST be last route because routes are parsed in order they're defined.
];

@NgModule({ // This decorator changes this typescript class into an Angular Module.
  imports: [
      RouterModule.forRoot(appRoutes) // forRoot will register the routes to the root of the application.
                                     // Other things can be registered this way, but routes must be registered here.
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }

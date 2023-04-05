import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { DetailComponent } from './components/recipes/detail/detail.component';
import { RegisterComponent } from './components/user/register/register.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},// se il percorso inserito é vuoto torna alla home
  {path: 'home', component: HomeComponent},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: 'detail/:title/:_id', component: DetailComponent},
    {path: '', pathMatch: 'full', component: RecipesListComponent}
  ]},
  {path: 'new-recipe', component: NewRecipeComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'home'} //se il percorso viene sbagliato dall'utente torna alla  home
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


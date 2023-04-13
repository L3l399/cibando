import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RecipeRoutingModule } from "./recipes-routing.module";

import { RecipeCardComponent } from './../../shared/recipe-card/recipe-card.component';
import { RecipesComponent } from "./recipes.component";
import { DetailComponent } from "./detail/detail.component";
import { NewRecipeComponent } from "../new-recipe/new-recipe.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";

@NgModule({
  declarations: [
    RecipeCardComponent,
    RecipesComponent,
    DetailComponent,
    NewRecipeComponent,
    RecipesListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    ToastModule,
    CKEditorModule,
    RecipeRoutingModule
  ],

  exports: [RecipeCardComponent]

})
export class RecipesModule {}

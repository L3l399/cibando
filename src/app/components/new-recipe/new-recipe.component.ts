import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import  { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent {

  ricettaInserita: any;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('',  Validators.required),
    published: new FormControl(false),
    difficulty: new FormControl('1', [Validators.required, Validators.max(5), Validators.min(1)]),
  });

  constructor(
    private recipeService: RecipeService,
    private modalService: NgbModal,
    private router: Router,
    ){}

    onSubmit(): void {
      const recipe = this.form.value;
      this.recipeService.insertRecipe(recipe).pipe(take(1)).subscribe({
        next: (res) => {
          console.log(res);
          this.ricettaInserita = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.recipeService.datiRicetta.next(recipe);
      // this.router.navigate(['new-recipe'])
    }

    onClose(){
      this.ricettaInserita = '';
      this.router.navigate(['recipes'])
    }

    onNewRecipe(){
      this.ricettaInserita = '';
      this.form.patchValue({
        title : '',
        description : '',
        image : '',
        published : false,
        difficulty : null,
      })
    }

  }



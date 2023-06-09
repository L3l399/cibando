import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit  {

  ricetta: Recipe;
  percorsoStelline = '../../../../assets/images/difficolta-'
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ){}

    ngOnInit(): void {
        this.onGetRecipe();
    }

  onGetRecipe():void{
    const id = this.activatedRoute.snapshot.paramMap.get('_id');// mi arriva una stringa e la trasformo in numero
    // const id = Number(this.activatedRoute.snapshot.paramMap.get('id')); //esempio se ho piú elemnti

    this.recipeService.getRecipe(id).subscribe({
      next: (res) =>{
        this.ricetta = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //se abbimo necessitá di recuperare piú parametri utilizziamo questo modo
  onGetRecipe2():void {
    this.activatedRoute.params.subscribe((parametriUrl) => {

      const id = parametriUrl['_id'];

      this.recipeService.getRecipe(id).subscribe({
        next: (res) =>{
          this.ricetta = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
    })
  }

}

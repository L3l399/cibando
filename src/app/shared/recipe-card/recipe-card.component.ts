
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  providers: [MessageService]
})
export class RecipeCardComponent implements OnDestroy, OnInit {
  @Input() pag: string;
  @Output() messaggio = new EventEmitter();

  // recipes: Recipe[];
  ricetteTotali: number;
  page = 1;
  ricettePerPagina = 4;

  recipes$: Observable<Recipe[]> = this.recipeService.getRecipes().pipe(
    map((response) => response.filter(ricetteFiltrate => ricetteFiltrate.difficulty < 3)),
    map(res => this.ricette = res),
  );
  ricette: Recipe[];

  ruolo: any;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService
    ){}

    ngOnDestroy(): void {
      console.log('utente uscito dal componente')
    }

    ngOnInit(): void {
      if(JSON.parse(localStorage.getItem('user')) != null) {
        this.userService.userRole.subscribe({
          next: (res) => {
            this.ruolo = res;
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    }

    inviaTitolo(titolo: string){
      this.messaggio.emit(titolo);
    }

    paginate(event){
      event.page = event.page + 1;
      this.page = event.page;
    }

    // prendiRicette(){
    //   this.recipeService.getRecipes()
    //   .pipe(
    //     take(1)
    //     )
    //     .subscribe({
    //       next: (res) => {
    //         this.recipes = res;
    //         this.ricetteTotali = res.length;
    //         if(this.pag){
    //           this.recipes = this.recipes.sort((a,b) => b._id - a._id).slice(0,4);
    //         }
    //       },
    //       error: (error) => {
    //         console.log(error);
    //       }
    //     })
    //   }
    }

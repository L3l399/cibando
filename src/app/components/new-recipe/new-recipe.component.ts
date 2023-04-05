import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import  { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  title: string;
  description: string;
  image: string;
  published: boolean;
  difficulty: number;


  constructor(
    private recipeService: RecipeService,
    private modalService: NgbModal,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.prendiDatiRicetta();
  }

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('',  Validators.required),
    published: new FormControl('', Validators.required),
    difficulty: new FormControl('1', [Validators.required, Validators.max(5), Validators.min(1)]),
  });

  onSubmit(): void{
    const recipe = {
      title: this.form.value.title,
      description: this.form.value.description,
      image: this.form.value.image,
      published: this.form.value.published,
      difficulty: this.form.value.difficulty
    }
    this.recipeService.insertRecipe(recipe).subscribe(res =>{
      console.log('response is', res)
    });
    this.recipeService.datiRicetta.next(recipe);
    // this.router.navigate(['new-recipe'])
  }

  prendiDatiRicetta(){
    this.recipeService.datiRicetta.subscribe((res: any) => {
      this.title = res.title;
      this.description = res.description;
      this.image = res.image;
      this.published = res.published;
      this.difficulty = res.difficulty;
    })
  }

  svuotaCampi(){
    this.form.value.title = '',
    this.form.value.description = '',
    this.form.value.image = '',
    // this.form.value.published = false,
    this.form.value.difficulty = null
  }

  closeModal(){
    this.title = '';
    this.description = '';
    this.image = '';
    this.published = false;
    this.difficulty = null;
  }

  open(content: any, titolo?: string){
    let title = titolo;
    this.modalService.open(content, {ariaLabelledBy: 'modale servizi', size: 'lg', centered: true}).result.then((res) => {
      this.svuotaCampi();
      // this.router.navigate(['recipes'])
      console.log('azione da eseguire' + titolo);
    }).catch((res) => {
      console.log('nessuna azione da eseguire');
    })
  }
}



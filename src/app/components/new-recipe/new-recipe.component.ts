import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import  { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss'],
  providers: [MessageService]
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

  Editor = ClassicEditorBuild;

  editorConfig = {
    toolbar: {
        items: [
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'heading',
            '|',
            'indent',
            'outdent',
            '|',
            'codeBlock',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
        ]
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    height: 300,
};


  constructor(
    private recipeService: RecipeService,
    private modalService: NgbModal,
    private router: Router,
    private messageService: MessageService
  ){}

    onSubmit(): void {
      const recipe = this.form.value;
      this.recipeService.insertRecipe(recipe).pipe(take(1)).subscribe({
        next: (res) => {
          console.log(res);
          this.ricettaInserita = res;
          this.messageService.add({severity: 'success', summary: 'Ricetta Inserita!', detail: 'la ricetta é stata inserita correttamente', life: 3000})
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

    open(content: any, titolo?: string){
      let title = titolo;
      this.modalService.open(content, {ariaLabelledBy: 'modale ricette', size: 'lg', centered: true}).result.then((res) => {
        this.onClose();
      }).catch((res) => {
        this.onNewRecipe();
      })
    }
  }



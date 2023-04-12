import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '../customValidator';
import { UserService } from 'src/app/services/user.service';
import  { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  utenteInserito: any;



  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]),
    ripetiPassword: new FormControl('', Validators.required),
    accetto: new FormControl('', Validators.requiredTrue),
    note: new FormControl(''),
  },
  [CustomValidator.MatchValidator('password', 'ripetiPassword')]
  );

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
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    ){}

    onSubmit(){
      const user = this.form.value;
      this.userService.insertUser(user).pipe(take(1)).subscribe({
        next: (res) => {
          console.log(res);
          this.utenteInserito = res;
          this.userService.datiUtente.next(user);
          this.router.navigate(['home'])
        },
        error: (err) => {
          console.log(err);
        }
      });

    }

    open(content: any, titolo?: string){
      let title = titolo;
      this.modalService.open(content, {ariaLabelledBy: 'modale servizi', size: 'lg', centered: true}).result.then((res) => {
        console.log('azione da eseguire' + titolo);
      }).catch((res) => {
        console.log('nessuna azione da eseguire');
      })
    }
  }

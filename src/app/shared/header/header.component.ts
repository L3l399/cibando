import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { ReplaySubject } from 'rxjs';

import { faShrimp } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {
  faShrimp = faShrimp;
  faRectangleList = faRectangleList;
  faHome = faHome;
  faUser = faUser;
  faPlus = faPlus;
  faMagnifyingGlass = faMagnifyingGlass;

  user: any;
  ricerca: string = "";


  constructor(private router: Router, public authService: AuthService,private recipeService: RecipeService){}

  ngDoCheck(): void {
    if(JSON.parse(localStorage.getItem('user')) !== null){
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }


risultato() {
    const currentRoute = this.router.url;
    if(currentRoute !== `/recipes/search/${this.ricerca}`) {
      this.recipeService.testoCercato.next(this.ricerca);
      this.router.navigate([`/recipes/search/${this.ricerca}`]);
      this.ricerca = '';
    } else {
      this.recipeService.testoCercato.next(this.ricerca);
      this.router.navigate([`/recipes/search/${this.ricerca}`]);
      this.ricerca = '';
    }
  }

}


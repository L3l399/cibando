import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { faShrimp } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cibando';

  faShrimp = faShrimp;
  faRectangleList = faRectangleList;
  faHome = faHome;

  images = [
    // {id:  1,
    //   label: 'Spaghetti  al pomodoro',
    // },
    // {id:  2,
    //   label: 'Tagliata di manzo',
    // },
    // {id:  1,
    //   label: 'Tiramisú',
    // }
  ]

  percorso = "../assets/images/carousel-";

  colore = 'red';


}


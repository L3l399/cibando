import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit  {
  images = [
    {id:  1, label: 'Spaghetti  al pomodoro',},
    {id:  2, label: 'Tagliata di manzo',},
    {id:  3, label: 'Tiramisú',}

  ]

  percorso = "../assets/images/carousel-";


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

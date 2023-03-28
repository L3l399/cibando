import { Component } from '@angular/core';

import { faShrimp } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faShrimp = faShrimp;
  faRectangleList = faRectangleList;
  faHome = faHome;
}

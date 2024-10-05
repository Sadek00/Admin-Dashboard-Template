import { Component } from '@angular/core';
import { AppHeaderNavbarComponent } from '../app-header-navbar/app-header-navbar.component';
import { AppSideNavbarComponent } from '../app-side-navbar/app-side-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppHeaderNavbarComponent,AppSideNavbarComponent,RouterOutlet],
  templateUrl: './app-home.component.html',
  styleUrl: './app-home.component.css'
})
export class AppHomeComponent {

}

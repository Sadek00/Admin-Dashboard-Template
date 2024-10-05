import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderNavbarComponent } from "./layout/app-header-navbar/app-header-navbar.component";
import { AppSideNavbarComponent } from "./layout/app-side-navbar/app-side-navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sahl-admin';
}

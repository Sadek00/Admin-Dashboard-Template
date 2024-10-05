import { Component } from '@angular/core';
import { NavItemComponent } from "../nav-item/nav-item.component";
import { RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationItem } from '../../models/navigation-item';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [NavItemComponent, RouterModule, CommonModule, RouterLinkActive],
  templateUrl: './app-side-navbar.component.html',
  styleUrl: './app-side-navbar.component.css'
})
export class AppSideNavbarComponent {
  navigationItems: NavigationItem[] = [];

  constructor(
    private navigationService: NavigationService,

  ) {}

  ngOnInit(): void {
    this.navigationItems = this.navigationService.getNavigationItems();
  }

  isActive(link: string | undefined): boolean {
    // Logic to determine if a link is active
    return location.pathname === link;
  }
  
  toggleExpanded(item: NavigationItem) {
    item.expanded = !item.expanded;
  }
}

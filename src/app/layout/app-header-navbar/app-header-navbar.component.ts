import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener, inject, Renderer2, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {  
  heroBell, 
  heroSun, 
  heroMoon, 
  heroEllipsisVertical, 
  heroEllipsisHorizontal,
  heroMagnifyingGlass 
} from '@ng-icons/heroicons/outline';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule, NgIconComponent],
  providers: [
    provideIcons({  
      heroBell, 
      heroSun, 
      heroMoon, 
      heroEllipsisVertical, 
      heroEllipsisHorizontal,
      heroMagnifyingGlass 
    })
  ],
  templateUrl: './app-header-navbar.component.html',
  styleUrl: './app-header-navbar.component.css'
})
export class AppHeaderNavbarComponent {
  private themeService = inject(ThemeService);
  
  isSearchFormShown = false;
  searchQuery = '';
  notificationCount = signal(12);
  profileImage = signal('https://avatars.githubusercontent.com/u/48727846?v=4');
  userName = signal('User Profile');

  isDarkTheme = this.themeService.isDarkTheme;

  constructor(private renderer: Renderer2) {}
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleNotifications() {
    // Implement notifications dropdown logic
  }

  toggleVerticalMenu() {
    // Implement vertical menu logic
  }

  toggleHorizontalMenu() {
    // Implement horizontal menu logic
  }

  toggleProfile() {
    // Implement profile dropdown logic
  }
  toggleSearch(event: Event) {
    if (window.innerWidth < 576) {
      event.preventDefault(); // Prevent the default form submission behavior
      const searchForm = this.renderer.selectRootElement('.content nav form', true);
      this.isSearchFormShown = !this.isSearchFormShown;

      if (this.isSearchFormShown) {
        this.renderer.addClass(searchForm, 'show');
      } else {
        this.renderer.removeClass(searchForm, 'show');
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // const searchForm = this.renderer.selectRootElement('.content nav form', true);
    // const searchBtnIcon = this.renderer.selectRootElement('.content nav form .search-btn i', true);
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    if (window.innerWidth < 768) {
      this.renderer.addClass(sidebar, 'close');
      if (content) {
        this.renderer.setStyle(content, 'width', 'calc(100% - 75px)');
        this.renderer.setStyle(content, 'left', '75px');
      }
    } else {
      this.renderer.removeClass(sidebar, 'close');
      if (content) {
        this.renderer.setStyle(content, 'width', 'calc(100% - 240px)');
        this.renderer.setStyle(content, 'left', '240px');
      }
    }

    // if (window.innerWidth > 576) {
    //   this.renderer.removeClass(searchForm, 'show');
    //   this.renderer.removeClass(searchBtnIcon, 'bx-x');
    //   this.renderer.addClass(searchBtnIcon, 'bx-search');
    //   this.isSearchFormShown = false;
    // }
  }
  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    if (sidebar?.classList.contains('close')) {
      // Remove the 'close' class and apply expanded styles
      this.renderer.removeClass(sidebar, 'close');
      if (content) {
        if (window.innerWidth < 768){
          this.renderer.setStyle(content, 'width', 'calc(100% - 215px)');
          this.renderer.setStyle(content, 'left', '215px');
        }
        else{
          this.renderer.setStyle(content, 'width', 'calc(100% - 240px)');
          this.renderer.setStyle(content, 'left', '240px');
        }       
      }
    } else {
      // Add the 'close' class and apply collapsed styles
      this.renderer.addClass(sidebar, 'close');
      if (content) {
        this.renderer.setStyle(content, 'width', 'calc(100% - 75px)');
        this.renderer.setStyle(content, 'left', '75px');
      }
    }
  }
  
  dropdownVisible:boolean = false;
  dropdownVisibleForUser:boolean = false;

  notifications = [
    { title: 'Lorem, ipsum dolor.', description: 'Lorem ipsum dolor sit amet.', status: 'Success' },
    { title: 'Lorem, ipsum dolor.', description: 'Lorem ipsum dolor sit amet.', status: 'Failed' },
    { title: 'Lorem, ipsum dolor.', description: 'Lorem ipsum dolor sit amet.', status: 'Success' },
    { title: 'Lorem, ipsum dolor.', description: 'Lorem ipsum dolor sit amet.', status: 'Failed' },
    { title: 'Lorem, ipsum dolor.', description: 'Lorem ipsum dolor sit amet.', status: 'Success' }
  ];

  notificationsForUser = [
    { title: 'Lorem, ipsum dolor.', description: 'Lorem ipsum dolor sit amet.', status: 'Success' },
    { title: 'Lorem, ipsum dolor.', description: 'Lorem ipsum dolor sit amet.', status: 'Failed' },
    { title: 'Lorem, ipsum dolor.', description: 'Lorem ipsum dolor sit amet.', status: 'Success' },
    { title: 'Lorem, ipsum dolor.', description: 'Lorem ipsum dolor sit amet.', status: 'Failed' },
    { title: 'Lorem, ipsum dolor.', description: 'Lorem ipsum dolor sit amet.', status: 'Success' }
  ];

  // Toggle for notifications dropdown
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    if (this.dropdownVisible) {
      this.dropdownVisibleForUser = false;   // Close user dropdown when notification opens
    }
  }

  // Toggle for user profile dropdown
  toggleDropdownForUser() {
    this.dropdownVisibleForUser = !this.dropdownVisibleForUser;
    if (this.dropdownVisibleForUser) {
      this.dropdownVisible = false;          // Close notification dropdown when user profile opens
    }
  }
}

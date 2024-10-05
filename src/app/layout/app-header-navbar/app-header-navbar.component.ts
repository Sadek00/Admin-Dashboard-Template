import { CommonModule } from '@angular/common';
import { Component, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header-navbar.component.html',
  styleUrl: './app-header-navbar.component.css'
})
export class AppHeaderNavbarComponent {
  isSearchFormShown = false;

  constructor(private renderer: Renderer2) {}

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
    const searchForm = this.renderer.selectRootElement('.content nav form', true);
    const searchBtnIcon = this.renderer.selectRootElement('.content nav form .search-btn i', true);
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

    if (window.innerWidth > 576) {
      this.renderer.removeClass(searchForm, 'show');
      this.renderer.removeClass(searchBtnIcon, 'bx-x');
      this.renderer.addClass(searchBtnIcon, 'bx-search');
      this.isSearchFormShown = false;
    }
  }
  toggleMenu() {
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
  

}

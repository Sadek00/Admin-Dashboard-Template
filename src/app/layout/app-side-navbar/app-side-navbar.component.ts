import { Component, ElementRef, Renderer2 } from '@angular/core';
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
  activePopup: HTMLElement | null = null;
  activeMenuItem: HTMLElement | null = null;
  popupTimeout: any;

  constructor(
    private navigationService: NavigationService,
    private renderer: Renderer2, private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.navigationItems = this.navigationService.getNavigationItems();
  }

  isActive(link: string | undefined): boolean {
    // Logic to determine if a link is active
    return location.pathname === link;
  }
  
  toggleExpanded(item: any, event: Event) {
    if (!this.isSidebarCollapsed()) {
      event.preventDefault();
      event.stopPropagation();
      item.expanded = !item.expanded;
    }
  }
  /**************************************hover functionality when sidebar is compact ************************************/
  
  showPopup(event: MouseEvent, item: any, menuItemEl: HTMLElement) {
    if (!this.isSidebarCollapsed()) return;
    
    this.clearPopupTimeout();
    this.removeActivePopup();

    const popup = this.renderer.createElement('div');
    this.renderer.addClass(popup, 'sidebar-popup');
    
    // Add mouseenter event to prevent popup from closing
    this.renderer.listen(popup, 'mouseenter', () => {
      this.clearPopupTimeout();
    });
    
    // Add mouseleave event to close popup when mouse leaves
    this.renderer.listen(popup, 'mouseleave', () => {
      this.hidePopup();
    });
    
    if (item.type === 'collapse') {
      this.createCollapsePopup(popup, item);
    } else {
      this.createSimplePopup(popup, item);
    }

    const rect = menuItemEl.getBoundingClientRect();
    this.renderer.setStyle(popup, 'top', `${rect.top - 6}px`);
    this.renderer.setStyle(popup, 'left', `${rect.right + 24}px`);

    this.renderer.appendChild(document.body, popup);

    // Set active menu item and add hover-active class
    this.activeMenuItem = menuItemEl;
    this.renderer.addClass(menuItemEl, 'hover-active');
    
    this.activePopup = popup;
  }

  hidePopup() {
    this.popupTimeout = setTimeout(() => {
      this.removeActivePopup();
    }, 300);
  }

  clearPopupTimeout() {
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout);
      this.popupTimeout = null;
    }
  }

  removeActivePopup() {
    if (this.activePopup && this.activePopup.parentNode) {
      this.activePopup.parentNode.removeChild(this.activePopup);
      this.activePopup = null;
    }
    
    // Remove hover-active class from previous menu item
    if (this.activeMenuItem) {
      this.renderer.removeClass(this.activeMenuItem, 'hover-active');
      this.activeMenuItem = null;
    }
  }

  private createCollapsePopup(popup: HTMLElement, item: any) {
    // Create header with item title
    const header = this.renderer.createElement('div');
    this.renderer.addClass(header, 'popup-header');
    const headerText = this.renderer.createText(item.title);
    this.renderer.appendChild(header, headerText);
    this.renderer.appendChild(popup, header);

    // Create content container
    const contentContainer = this.renderer.createElement('div');
    this.renderer.addClass(contentContainer, 'popup-content');

    if (item.children && item.children.length > 0) {
      const ul = this.renderer.createElement('ul');
      this.renderer.addClass(ul, 'popup-menu');

      item.children.forEach((child: any) => {
        this.createMenuItem(ul, child);
      });

      this.renderer.appendChild(contentContainer, ul);
    }
    
    this.renderer.appendChild(popup, contentContainer);
  }

  private createMenuItem(parentEl: HTMLElement, item: any) {
    const li = this.renderer.createElement('li');
    this.renderer.addClass(li, 'popup-menu-item');
    
    // Create menu item container
    const itemContainer = this.renderer.createElement('div');
    this.renderer.addClass(itemContainer, 'menu-item-container');
    
    // Create arrow icon
    const arrow = this.renderer.createElement('i');
    this.renderer.addClass(arrow, 'bx');
    this.renderer.addClass(arrow, 'menu-arrow');
    
    if (item.children && item.children.length > 0) {
      this.renderer.addClass(arrow, 'bx-chevron-right');
    } else {
      this.renderer.addClass(arrow, 'bx-right-arrow-alt');
    }
    
    this.renderer.appendChild(itemContainer, arrow);
    
    // Create menu item link/text
    const a = this.renderer.createElement('a');
    if (item.url && !item.children?.length) {
      this.renderer.setAttribute(a, 'href', item.url);
    } else {
      this.renderer.addClass(a, 'nested-trigger');
    }
    const text = this.renderer.createText(item.title);
    this.renderer.appendChild(a, text);
    this.renderer.appendChild(itemContainer, a);
    
    this.renderer.appendChild(li, itemContainer);
    
    // Handle nested children
    if (item.children && item.children.length > 0) {
      // Create nested container
      const nestedContainer = this.renderer.createElement('div');
      this.renderer.addClass(nestedContainer, 'nested-menu-container');
      
      const nestedUl = this.renderer.createElement('ul');
      this.renderer.addClass(nestedUl, 'nested-menu');
      
      item.children.forEach((childItem: any) => {
        this.createMenuItem(nestedUl, childItem);
      });
      
      this.renderer.appendChild(nestedContainer, nestedUl);
      this.renderer.appendChild(li, nestedContainer);
      
      // Add click event to toggle nested menu
      this.renderer.listen(itemContainer, 'click', (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const isExpanded = nestedContainer.classList.contains('expanded');
        
        if (isExpanded) {
          this.renderer.removeClass(nestedContainer, 'expanded');
          this.renderer.removeClass(arrow, 'bx-chevron-down');
          this.renderer.addClass(arrow, 'bx-chevron-right');
        } else {
          this.renderer.addClass(nestedContainer, 'expanded');
          this.renderer.removeClass(arrow, 'bx-chevron-right');
          this.renderer.addClass(arrow, 'bx-chevron-down');
        }
      });
    }
    
    this.renderer.appendChild(parentEl, li);
  }

  private createNestedMenuItem(item: any): HTMLElement {
    const li = this.renderer.createElement('li');
    this.renderer.addClass(li, 'popup-menu-item');
    
    // Create arrow icon
    const arrow = this.renderer.createElement('i');
    this.renderer.addClass(arrow, 'bx');
    this.renderer.addClass(arrow, item.children?.length ? 'bx-chevron-down' : 'bx-right-arrow-alt');
    this.renderer.addClass(arrow, 'menu-arrow');
    this.renderer.appendChild(li, arrow);
    
    // Create menu item link/span
    const a = this.renderer.createElement(item.url ? 'a' : 'span');
    if (item.url) {
      this.renderer.setAttribute(a, 'href', item.url);
    }
    const text = this.renderer.createText(item.title);
    this.renderer.appendChild(a, text);
    this.renderer.appendChild(li, a);

    // Handle nested children
    if (item.children && item.children.length > 0) {
      const nestedUl = this.renderer.createElement('ul');
      this.renderer.addClass(nestedUl, 'nested-popup-menu');
      
      item.children.forEach((child: any) => {
        const nestedLi = this.createNestedMenuItem(child);
        this.renderer.appendChild(nestedUl, nestedLi);
      });
      
      this.renderer.appendChild(li, nestedUl);
    }
    
    return li;
  }

  private createSimplePopup(popup: HTMLElement, item: any) {
    const div = this.renderer.createElement('div');
    const text = this.renderer.createText(item.title);
    this.renderer.appendChild(div, text);
    this.renderer.appendChild(popup, div);
  }

  private createNestedPopupItem(li: HTMLElement, item: any) {
    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(item.title);
    this.renderer.appendChild(span, text);
    this.renderer.appendChild(li, span);

    if (item.children && item.children.length > 0) {
      const subUl = this.renderer.createElement('ul');
      this.renderer.addClass(subUl, 'popup-submenu');

      item.children.forEach((subChild: any) => {
        const subLi = this.renderer.createElement('li');
        this.createSimplePopupItem(subLi, subChild);
        this.renderer.appendChild(subUl, subLi);
      });

      this.renderer.appendChild(li, subUl);
    }
  }

  private createSimplePopupItem(li: HTMLElement, item: any) {
    const a = this.renderer.createElement('a');
    if (item.url) {
      this.renderer.setAttribute(a, 'href', item.url);
    }
    const text = this.renderer.createText(item.title);
    this.renderer.appendChild(a, text);
    this.renderer.appendChild(li, a);
  }

  private isSidebarCollapsed(): boolean {
    const sidebar = this.el.nativeElement.querySelector('.sidebar');
    return sidebar?.classList.contains('close');
  }
}

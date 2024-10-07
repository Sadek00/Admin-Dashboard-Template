import { Injectable } from '@angular/core';
import { NavigationItem } from '../models/navigation-item';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }
  getNavigationItems(): NavigationItem[] {
    return [
      {
        id: '1',
        title: 'Dashboard',
        type: 'item',
        icon: 'bx bxs-dashboard',
        url: '/dashboard',
        exactMatch: true
      },
      {
        id: 'divider-1',
        type: 'divider',
        title: 'Custom', // This will be the label for the divider
        children: [
          {
            id: '2',
            title: 'User Profile',
            type: 'item',
            url: '/user-profile',
            icon: 'bx bx-user',
            exactMatch: true
          },
          {
            id: '3',
            title: 'Pages',
            type: 'collapse',
            icon: 'bx bx-store-alt',
            children: [
              {
                id: '3-1',
                title: 'Blog',
                type: 'collapse',
                children: [
                  {
                    id: '3-1-1',
                    title: 'Home',
                    type: 'item',
                    url: '/blog/home'
                  },
                  {
                    id: '3-1-2',
                    title: 'Post',
                    type: 'item',
                    url: '/blog/post'
                  }
                ]
              },
              {
                id: '3-2',
                title: 'Pricing',
                type: 'item',
                url: '/pricing'
              }
            ]
          },
          {
            id: '2',
            title: 'User Profile',
            type: 'item',
            url: '/user-profile',
            icon: 'bx bx-user',
            exactMatch: true
          },
          {
            id: '3',
            title: 'Pages',
            type: 'collapse',
            icon: 'bx bx-store-alt',
            children: [
              {
                id: '3-1',
                title: 'Blog',
                type: 'collapse',
                children: [
                  {
                    id: '3-1-1',
                    title: 'Home',
                    type: 'item',
                    url: '/blog/home'
                  },
                  {
                    id: '3-1-2',
                    title: 'Post',
                    type: 'item',
                    url: '/blog/post'
                  }
                ]
              },
              {
                id: '3-2',
                title: 'Pricing',
                type: 'item',
                url: '/pricing'
              }
            ]
          },
          {
            id: '2',
            title: 'User Profile',
            type: 'item',
            url: '/user-profile',
            icon: 'bx bx-user',
            exactMatch: true
          },
          {
            id: '3',
            title: 'Pages',
            type: 'collapse',
            icon: 'bx bx-store-alt',
            children: [
              {
                id: '3-1',
                title: 'Blog',
                type: 'collapse',
                children: [
                  {
                    id: '3-1-1',
                    title: 'Home',
                    type: 'item',
                    url: '/blog/home'
                  },
                  {
                    id: '3-1-2',
                    title: 'Post',
                    type: 'item',
                    url: '/blog/post'
                  }
                ]
              },
              {
                id: '3-2',
                title: 'Pricing',
                type: 'item',
                url: '/pricing'
              }
            ]
          },
          {
            id: '2',
            title: 'User Profile',
            type: 'item',
            url: '/user-profile',
            icon: 'bx bx-user',
            exactMatch: true
          },
          {
            id: '3',
            title: 'Pages',
            type: 'collapse',
            icon: 'bx bx-store-alt',
            children: [
              {
                id: '3-1',
                title: 'Blog',
                type: 'collapse',
                children: [
                  {
                    id: '3-1-1',
                    title: 'Home',
                    type: 'item',
                    url: '/blog/home'
                  },
                  {
                    id: '3-1-2',
                    title: 'Post',
                    type: 'item',
                    url: '/blog/post'
                  }
                ]
              },
              {
                id: '3-2',
                title: 'Pricing',
                type: 'item',
                url: '/pricing'
              }
            ]
          }
        ]
      },
      {
        id: 'divider-6',
        type: 'divider',
        title: 'Other Links', // Another section with its own items
        children: [
          {
            id: '4',
            title: 'Contact Us',
            type: 'item',
            url: '/contact'
          },
          {
            id: '5',
            title: 'About Us',
            type: 'item',
            url: '/about'
          }
        ]
      },
    ];
  }
  
  
}

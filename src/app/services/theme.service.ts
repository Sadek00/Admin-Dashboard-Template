import { Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private darkTheme = signal(false);

  isDarkTheme = this.darkTheme.asReadonly();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.darkTheme.set(savedTheme === 'dark' || (!savedTheme && prefersDark));
    this.updateTheme();

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.darkTheme.set(e.matches);
        this.updateTheme();
      }
    });
  }

  toggleTheme() {
    this.darkTheme.update(dark => !dark);
    this.updateTheme();
  }

  private updateTheme() {
    const theme = this.darkTheme() ? 'dark' : 'light';
    this.document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
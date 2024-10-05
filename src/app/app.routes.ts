import { Routes } from '@angular/router';
import { AppHomeComponent } from './layout/app-home/app-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: '',
      component: AppHomeComponent,
      data: {
        title: 'Home'
      },
      children: [
        { path: 'dashboard', component: DashboardComponent },
        //{ path: 'settings', component: SettingsComponent },
        // Add more routes as needed
      ]
    },
    { path: '**', redirectTo: '' } // Redirect unknown paths to the default route
];

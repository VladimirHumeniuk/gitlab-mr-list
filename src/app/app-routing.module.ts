import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { GitlabSetupGuard } from './guards/gitlab-setup.guard';
import { DashboardGuard } from './guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [GitlabSetupGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

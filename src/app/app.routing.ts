import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { AdminLayoutModule } from './shared/layouts/admin-layout/admin-layout.module';
import { AuthLayoutModule } from './shared/layouts/auth-layout/auth-layout.module';


const routes: Routes = [
  {
    path: '', loadChildren: () => AdminLayoutModule, canActivate: [AuthGuard]
  },
  { path: 'auth', loadChildren: () => AuthLayoutModule },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

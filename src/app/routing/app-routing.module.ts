import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from '../components/error/error.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { TodoComponent } from '../components/todo/todo.component';
import { AppRoutes } from './route.model';


const routes: Routes = [
  { pathMatch: 'full', path: '', redirectTo: AppRoutes.Todo },
  { path: AppRoutes.Todo, component: TodoComponent },

  { path: AppRoutes.Error, component: ErrorComponent },

  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

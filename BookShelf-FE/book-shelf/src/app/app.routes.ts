import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:"full"},
  {path:'home',loadComponent:()=>import('./component/home/home.component').then(c=>c.HomeComponent)},
  { path: 'books', loadComponent:()=>import('./component/book-list/book-list.component').then(c=>c.BookListComponent) },
  // { path: '**', redirectTo: '' }

];

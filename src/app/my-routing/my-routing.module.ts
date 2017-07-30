import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoComponent }   from '../todo/todo.component';

const routes: Routes = [
  { path: '', component: TodoComponent, pathMatch: 'full' },
  { path: ':status',  component: TodoComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
  exports: [ RouterModule ]
})
export class MyRoutingModule {}

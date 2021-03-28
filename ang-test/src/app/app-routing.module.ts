import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponentComponent } from './user-component/user-component.component';
import {UserViewComponent} from './user-view/user-view.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponentComponent
  },
  {
    path: 'user',
    component: UserComponentComponent
  },
  {
    path: 'user/:id',
    component: UserViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

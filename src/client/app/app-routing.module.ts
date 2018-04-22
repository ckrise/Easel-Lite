import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { HomepageComponent } from './homepage/homepage.component'
import { ClassesComponent } from './classes/classes.component'
import { ClassDetailComponent } from './class-detail/class-detail.component'
import { NotFoundComponent } from './not-found/not-found.component'

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'classes/:classid', component: ClassDetailComponent },
  { path: '/*', component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { HomepageComponent } from './homepage/homepage.component'
import { ClassesComponent } from './classes/classes.component'
import { ClassDetailComponent } from './class-detail/class-detail.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { NewClassComponent } from './new-class/new-class.component'
import { RosterComponent } from './roster/roster.component'

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'classes/:classid', component: ClassDetailComponent },
  { path: 'new-class', component: NewClassComponent },
  { path: 'rosters/:classid', component: RosterComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

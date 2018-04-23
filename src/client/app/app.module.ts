import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ClassesComponent } from './classes/classes.component';
import { ApiService } from './api.service';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { NotFoundComponent } from './not-found/not-found.component'


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ClassesComponent,
    ClassDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

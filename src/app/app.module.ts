import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { CourseviewComponent } from './components/courseview/courseview.component';
import { ThemecardComponent } from './components/themecard/themecard.component';
import { ButtonComponent } from './components/button/button.component';
import { CourseService } from './service/course.service';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidemenuComponent,
    CourseviewComponent,
    ThemecardComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

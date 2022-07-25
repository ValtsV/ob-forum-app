import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { CourseviewComponent } from './components/courseview/courseview.component';
import { ThemecardComponent } from './components/themecard/themecard.component';
import { ButtonComponent } from './components/button/button.component';
import { CourseService } from './service/course.service';
import { TemasComponent } from './pages/temas/temas.component';
import { DiscusionesComponent } from './pages/discusiones/discusiones.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionsHeaderComponent } from './components/questions-header/questions-header.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './pages/question/question.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpRequestInterceptor } from './_helpers/http-request.interceptor'; 
import { NgxTiptapModule } from 'ngx-tiptap';
import { TiptapComponent } from './components/tiptap/tiptap.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { BtnComponent } from './components/btn/btn.component';
import { InnerHtmlComponent } from './components/inner-html/inner-html.component';
import { FilterNumbersPipe } from './pipes/filter-numbers.pipe';
import { PinButtonComponent } from './components/buttons/pin-button/pin-button.component';
import { FollowButtonComponent } from './components/buttons/follow-button/follow-button.component';
import { TranslatePipe } from './pipes/translate.pipe';
 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidemenuComponent,
    CourseviewComponent,
    ThemecardComponent,
    ButtonComponent,
    TemasComponent,
    DiscusionesComponent,
    QuestionsComponent,
    QuestionsHeaderComponent,
    QuestionCardComponent,
    QuestionComponent,
    AnswerComponent,
    AddQuestionComponent,
    LoginComponent,
    TiptapComponent,
    ImageUploadComponent,
    BtnComponent,
    InnerHtmlComponent,
    FilterNumbersPipe,
    PinButtonComponent,
    FollowButtonComponent,
    TranslatePipe
        ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxTiptapModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

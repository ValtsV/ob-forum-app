import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { DiscusionesComponent } from './pages/discusiones/discusiones.component';
import { LoginComponent } from './pages/login/login.component';
import { QuestionComponent } from './pages/question/question.component';
import { TemasComponent } from './pages/temas/temas.component';

const routes: Routes = [
  {path: 'temas', 
  component: TemasComponent, 
  canActivate: [LoginGuard]},
  {path: 'temas/:id', component: DiscusionesComponent, 
  canActivate: [LoginGuard]},
  {path: 'temas/:themeId/preguntas/:questionId', component: QuestionComponent, 
  canActivate: [LoginGuard]},
  {path: 'temas/:themeId/pregunta-nueva', component: AddQuestionComponent, 
  canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'temas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

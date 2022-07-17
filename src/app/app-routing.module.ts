import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from './guards/access.guard';
import { LoginGuard } from './guards/login.guard';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { DiscusionesComponent } from './pages/discusiones/discusiones.component';
import { LoginComponent } from './pages/login/login.component';
import { QuestionComponent } from './pages/question/question.component';
import { TemasComponent } from './pages/temas/temas.component';

const routes: Routes = [
  {path: 'temas', 
  component: TemasComponent, 
  canActivate: [AccessGuard]},
  {path: 'temas/:id', component: DiscusionesComponent, 
  canActivate: [AccessGuard]},
  {path: 'temas/:themeId/preguntas/:questionId', component: QuestionComponent, 
  canActivate: [AccessGuard]},
  {path: 'temas/:themeId/pregunta-nueva', component: AddQuestionComponent, 
  canActivate: [AccessGuard]},
  {path: 'login', component: LoginComponent,
  canActivate: [LoginGuard]},
  { path: '', redirectTo: 'temas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: "ignore",
    anchorScrolling:'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

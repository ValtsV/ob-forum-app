import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { DiscusionesComponent } from './pages/discusiones/discusiones.component';
import { QuestionComponent } from './pages/question/question.component';
import { TemasComponent } from './pages/temas/temas.component';

const routes: Routes = [
  {path: 'temas', component: TemasComponent},
  {path: 'temas/:id', component: DiscusionesComponent},
  {path: 'temas/:themeId/preguntas/:questionId', component: QuestionComponent},
  {path: 'temas/:themeId/pregunta-nueva', component: AddQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

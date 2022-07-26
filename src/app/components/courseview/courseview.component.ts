import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';
import { CourseService } from 'src/app/service/course.service';
import {Theme} from '../../Theme';
import { ColorsService } from 'src/app/service/colors.service';

@Component({
  selector: 'app-courseview',
  templateUrl: './courseview.component.html',
  styleUrls: ['./courseview.component.scss', '../../app.component.scss']
})
export class CourseviewComponent implements OnInit {
  title!: string
  courseId!: number
  courseImg!: any
  themes: Theme[] = []
  courseColor: string = ''
  showThemeOrderOptions: boolean = false
  isFollowing: boolean = false
 
  constructor(
    private themeService: ThemeService, 
    private courseService: CourseService,
    private colorService: ColorsService) { 
  }

  ngOnInit(): void {
    this.courseService.getSelectedCourse().subscribe((course) => {
      this.title = course.name
      this.courseId = course.id
      this.courseImg = course.avatar
      this.courseService.checkFollowStatus(course.id).subscribe({
        next: (isFollowing: boolean) => this.isFollowing = isFollowing,
        error: (error: any) => console.log(error)
      })
      
      this.themeService.getThemes(this.courseId).subscribe((themes) => this.themes = themes);

      this.courseColor = this.colorService.getHex(this.title)
    })

  }

  // orders by pinned only desc
  orderByPinned() {
    this.themes = this.themes.sort((a, b) => {
      if(!a.pinned && b.pinned) {
        return 1
      }
      return 0
    })
  }

  // orders by question count only desc
  orderByQuestionCount() {
    this.themes = this.themes.sort((a, b) => {
      if(a.preguntasCount >= b.preguntasCount) {
        return -1
      }
      return 0
    })
  }

  toggleFollow() {
    this.isFollowing ?
    this.courseService.deleteFollower(this.courseId).subscribe({
      next: (res: Response) => this.isFollowing = false,
      error: (error: any) => console.log(error)
    })     : 
      this.courseService.followCourse(this.courseId).subscribe({
        next: (res: Response) => this.isFollowing = true,
        error: (error: any) => console.log(error)
      })
  }

}

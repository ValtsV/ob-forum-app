import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';
import { CourseService } from 'src/app/service/course.service';
import {Theme} from '../../Theme';
import { ColorsService } from 'src/app/service/colors.service';
import { Course } from 'src/app/Course';

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
    this.courseService.getSelectedCourse().subscribe({
      next: (course: Course) => {
        this.title = course.name
        this.courseId = course.id
        this.courseImg = course.avatar
        
        // check follow status for pin button (to show pin or unpin)
        this.courseService.checkFollowStatus(course.id).subscribe({
          next: (isFollowing: boolean) => this.isFollowing = isFollowing,
          error: (error: any) => console.log(error)
        })
      
    
      this.themeService.getThemes(this.courseId).subscribe({
        next: (themes: Theme[]) => this.themes = themes,
        error: (error:  any) => console.log(error)
      })

      this.courseColor = this.colorService.getHex(this.title)
    },
    error: (error: any) => console.log(error)      
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

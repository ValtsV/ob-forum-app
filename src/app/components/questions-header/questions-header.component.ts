import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/service/theme.service';
import { Theme } from 'src/app/Theme';
import { Course } from 'src/app/Course';
import { CourseService } from 'src/app/service/course.service';
import { StorageService } from 'src/app/service/storage.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-questions-header',
  templateUrl: './questions-header.component.html',
  styleUrls: ['./questions-header.component.scss', '../../app.component.scss']
})
export class QuestionsHeaderComponent implements OnInit {
  course?: Course = {} as Course
  courseImg!: any
  theme: Theme = {} as Theme
  themeId!: number
  currentUser: User = {} as User
  isFollowing: boolean = false


  constructor(
    private themeService: ThemeService, 
    private courseService: CourseService, 
    private storageService: StorageService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.themeId = Number(this.route.snapshot.paramMap.get('id'));
    this.themeService.getTheme(this.themeId).subscribe({
      next: (theme: Theme) => {
        this.theme = theme
        this.courseService.getCourseById(this.theme.cursoId).subscribe({
          next: (course: Course) => {
            this.course = course
            this.courseImg = course.avatar   
          },
          error: (error: any) => console.log(error)
        })
        this.themeService.checkFollowStatus(this.themeId).subscribe({
          next: (isFollowing: boolean) => this.isFollowing = isFollowing,
          error: (error: any) => console.log(error)
        })
      }
    })
    this.storageService.currentUser.subscribe({
      next: (user: User) => this.currentUser = user,
      error: (error: any) => console.log(error)
    })
  }

  // pin/unpin theme
  onEmitCurrentId() {
    const themeRequest = {...this.theme, pinned: !this.theme.pinned}
   this.themeService.updateTheme(themeRequest).subscribe({
    next: (theme: Theme) => this.theme.pinned = theme.pinned,
    error: (error: any) => console.log(error)
   })
  }

  // follow/unfollow theme
  toggleFollow() {
    this.isFollowing ?
    this.themeService.deleteFollower(this.themeId).subscribe({
      next: (res: Response) => this.isFollowing = false,
      error: (error: any) => console.log(error)
    }) : 
      this.themeService.followTheme(this.themeId).subscribe({
        next: (res: Response) => this.isFollowing = true,
        error: (error: any) => console.log(error)
      })
  }
}
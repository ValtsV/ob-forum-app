import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CourseService } from 'src/app/service/course.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  errorStatus!: number
  return: string = ''
  eventBusSub?: Subscription;

  constructor(private userService: UserService, 
              private storageService: StorageService, 
              private authService: AuthService, 
              private courseService: CourseService, 
              private router: Router, 
              private route: ActivatedRoute, 
              private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/temas');
      // if (this.storageService.getToken()) {
      //   // validate token
      //   this.router.navigateByUrl(this.return);
      // }

      // this.eventBusSub = this.eventBusService.on('logout', () => {
      //   this.storageService.logout();
      // });
  }

  submitLoginForm() {
    if(this.form.valid) {
          const authData = this.form.getRawValue()  
          this.authService.login(authData).subscribe({
            next: data => {
              // this.storageService.saveToken(data.accessToken);

              // this.storageService.saveRefreshToken(data.refreshToken);
              this.storageService.saveUser(data)
              this.courseService.getCourses().subscribe(courses => {
                this.courseService.setSelectedCourse(courses[0])

                // Forces app reload, to set loggedin value in app component correctly / this way login guard stays simple
                this.redirect()
              })
              
            },
            error: err => {
              this.errorStatus = err.status
            }
          });
          
    }
  }

  redirect(){
    window.location.href=this.return
  } 

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

}

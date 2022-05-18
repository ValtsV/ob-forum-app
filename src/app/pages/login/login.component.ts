import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  // email = new FormControl('')
  // password = new FormControl('')

  constructor(private fb: FormBuilder) {
   }

  ngOnInit(): void {
  }

  submitLoginForm() {
    if(this.form.valid) {
          this.form.getRawValue();
    }
  }

}

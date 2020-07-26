import { ApiService } from './../services/api.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('msg', { static: false }) msg;
  userId = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  loginForm = this.fb.group({
    userId: ['',[Validators.required, Validators.email]],
    password: ['',Validators.required]
  });

  constructor(
    readonly router: Router, 
    readonly auth: ApiService,
    private fb: FormBuilder
    ) {}

    ngOnInit() {}


  login(loginForm){
    this.auth.login(loginForm.value).subscribe(response =>{
      if(response.error){
        this.msg.showErrorMsg("error occured!!!!");
      }
      else{
        this.msg.showSuccessMsg("Logged In successfully!!!");
      }
    })
  }
}

import { ApiService } from './../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('msg', { static: false }) msg;
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  profileForm = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    name: ['',Validators.required],
    password: ['',Validators.required]
  });

  constructor(private auth: ApiService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {}


  signUp(profileForm){
    this.auth.signUp(profileForm.value).subscribe(response =>{
      if(response.status!=201){
        this.msg.showErrorMsg("Couldn't Sign Up User");
      }
      else{
        this.msg.showSuccessMsg(response.error.text);
      }
    })
    setTimeout (() => {
      this.router.navigate(['/login']);
   }, 3000);
  }
}

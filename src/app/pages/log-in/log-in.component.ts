import { Component, OnInit } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  errored: boolean;
  users: any;
  invalidParam: boolean = false
  isLoggedIn: any;                 
  constructor(
    private datastore: DatastoreService,
    private formBuilder: FormBuilder, 
  ) { }

  /* Page Tasks:
  *
  *  1) Take and validate the user input fields
  *  2) Connect with API
  *  3) Display the necessary error messages
  *  4) Style the page
  *  5) Header should`t be vissible for this page
  *
  */
  ngOnInit() {
    if(this.datastore.isLoggedin()){
      this.navigateTo('current-status')
    }
    this.datastore.getUser().subscribe(res => {this.users = res; });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
  });
  }


  logIn() {
    if (this.loginForm.invalid) {
        this.errored = true;
        setTimeout( function() { this.errored = false; }.bind(this), 3000 );
    } else {
        this.setToken(this.loginForm.value)
    }
}

  setToken(param){
    const user = this.validateUser(param)
    if(user !== false){
      localStorage.setItem('authToken', user[0].token);
      localStorage.setItem('userName', user[0].username);
      this.navigateTo('current-status')
    } else {
      this.invalidParam = true 
      setTimeout( function() { this.invalidParam = false; }.bind(this), 3000 );
    }
  }

  validateUser(param){
    let x = this.users.filter(f => f.email === param.email && f.password === param.password)
    console.log(x)
    if(x && x.length){
      return x
    }else{
      return false
    }
  }

  navigateTo(page: string) {
    this.datastore.navigateTo(page);
  }

}

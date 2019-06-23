import { Component, OnInit } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  errored: boolean;
  constructor(
    private datastore: DatastoreService,
    private formBuilder: FormBuilder,

  ) { }

  /* Page Tasks:
  *
  *  1) Take and validate the user input fields;
  *  2) Connect with API;
  *  3) Display the necessary error messages
  *  4) Style the page
  *  5) Header should`t be vissible for this page;
  * 
  */
  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmpassword:['', [Validators.required]],
  });
  }

  navigateTo(page: string) {
    this.datastore.navigateTo(page);
  }

  signIn() {
    if (this.signInForm.invalid) {
        this.errored = true;
        setTimeout( function() { this.errored = false; }.bind(this), 3000 );
    }else if (!this.checkPasswords(this.signInForm)){
        console.log("sono giuste")
        // this.loginForm.reset();
        this.datastore.addUser(this.signInForm.value)
    }else{
      console.log("son sbagliate")
  }
}


    checkPasswords(group: FormGroup){ // here we have the 'passwords' group
      let pass = group.controls.password.value;
      let confirmPass = group.controls.confirmpassword.value;
      console.log(pass,confirmPass)
      return pass === confirmPass ? null : { notSame: true }
      }
    }




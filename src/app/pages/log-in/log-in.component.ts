import { Component, OnInit } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  errored: boolean;
  constructor(
    private datastore: DatastoreService,
    private formBuilder: FormBuilder
    
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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }


  logIn() {
    console.log(this.loginForm.value,"aa")
    if (this.loginForm.invalid) {
        this.errored = true;
        setTimeout( function() { this.errored = false; }.bind(this), 3000 );
    } else {
        // dispatch login 
        this.loginForm.reset();
    }
}


  navigateTo(page: string) {
    this.datastore.navigateTo(page);
  }

}

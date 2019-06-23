import { Component, OnInit } from '@angular/core';
import { DatastoreService } from './services/datastore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Task';
  isLoggedIn$ : Observable<string>
  constructor(
    private api: DatastoreService,
  ) { }
  
  isLogged() {
    return this.api.isLogged();
  }
  ngOnInit () {
  }
}

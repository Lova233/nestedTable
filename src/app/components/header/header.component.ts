import { Component, OnInit } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { authI } from 'src/app/app.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public routeLinks: Array<any>;
  userName: string

  constructor(
    private api: DatastoreService
  ) {
    this.routeLinks = [
      { label: 'Current Status', link: 'client-status' },
      { label: 'Nested Data', link: 'nested-data' },
    ];

  }
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')
  }
  logOut(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    this.api.navigateTo('login');
  }
}

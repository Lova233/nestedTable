import { Component, OnInit, ViewChild } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';


import { policiesI, policiesDetailsI } from 'src/app/app.models';
import { Observable, of } from 'rxjs';
import { element } from 'protractor';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { ReturnStatement } from '@angular/compiler';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss'],
})
export class CurrentStatusComponent implements OnInit {

  displayedColumns: string[] = ['num', 'amount', 'description'];
  dataDetails: policiesDetailsI[];
  filteredData: policiesDetailsI[];
  isDataSelected: boolean = false;
  expandedElement: any;
  dataSource = new PoliciesDataSource(this.api);
  toShow: boolean;
  isDetailsAvailable: boolean = false;
  isExpansionDetailRow = (i: number, row: Object) => true;


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private api: DatastoreService,
  ) {}

  /* Page Tasks:
   *
   *  1) Connect and take the data from the API - use getPolicies function to retrieve the data
   *  2) Create one layer table witch will display the income data
   *  3) Table must contain the following columns: 
   * 
   *    ==> num, amount, description
   * 
   *  3) Style the page;
   *  4) Header must be vissible for this page;
   * 
   */

  ngOnInit() {
    this.api.getPoliciesDetails().subscribe(res => {this.dataDetails = res; });
  }
  show(element){
    this.toShow = element.polId;
    this.isRecordAvailable(element)
  }
  isRecordAvailable(e){
    let x = this.dataDetails.filter(f=>f.polId === e.polId)
    if(x && x.length){
      this.isDetailsAvailable = true
    }else{
      this.isDetailsAvailable = false
    }
  }
  filterData(e){
    let x = this.dataDetails.filter(f=>f.polId===e)
    if(x && x.length){
      return x
    }else{
      return false
    }
  }

  isEqual(e){
    return e === this.toShow
  }

}

export class PoliciesDataSource extends DataSource<any> {
  dataSource : policiesI;
  constructor(
    private api: DatastoreService
  ) {
    super()
  }
  connect(): Observable<policiesI[]> {
    return this.api.getPolicies();
  }

  disconnect() { }
}
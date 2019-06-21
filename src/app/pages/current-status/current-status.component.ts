import { Component, OnInit, ViewChild } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';


import { policiesI } from 'src/app/app.models';
import { Observable, of } from 'rxjs';
import { element } from 'protractor';

import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CurrentStatusComponent implements OnInit {

  isExpansionDetailRow = (i: number, row: Object) => true;
  // data$ : Observable<policiesI[]>
  displayedColumns: string[] = ['num', 'amount', 'description'];
  dataDetails: any;
  filteredData: any;
  isDataSelected: boolean = false;
  expandedElement: any;
  dataSource = new PoliciesDataSource(this.api);
  toShow: boolean;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // quello sopra è giusto?


  constructor(
    private api: DatastoreService
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
  // this.api.getPolicies().subscribe( res => { this.dataSource = res; });
  //   setTimeout(() => {
  //     console.log(this.dataDetails)
  //   }, 2000);
  }
  show(element){
this.toShow= element.polId;    
  }
  ele(e){
    let x = this.dataDetails.filter(f=>f.polId===e)
    return x
  }

  isEqual(e){
    console.log(e,this.toShow,e===this.toShow)
    return e === this.toShow
  }

}



export class PoliciesDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  dataSource : any;
  constructor(
    private api: DatastoreService
  ) {
    super()
  }

  static ds=[];

  connect(): Observable<policiesI[]> {
    return this.api.getPolicies();
  
  }

  disconnect() { }
}
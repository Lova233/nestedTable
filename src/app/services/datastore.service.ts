import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, forkJoin, Subject, of } from 'rxjs';
import { authI, policiesI, policiesDetailsI } from '../app.models';
import { catchError } from 'rxjs/operators';
import { ApiDataService } from './api-data.service';


@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  
  token:any;
  private subject = new Subject<string>();

  private SERVER_URL: string = "http://localhost:8080/api/";
  constructor(
    private router: Router,
    private http: HttpClient,
    private data: ApiDataService,
  ) { }
  

  isLogged(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  isLoggedin(){
    this.token = localStorage.getItem('authToken');
    return new Promise<boolean>((resolve,reject)=>{
      this.getUser().subscribe(res=>{
        resolve(res.filter(user=> user.token === this.token).length>0);  
      })
    })
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  public getUser(): Observable<authI[]> {
    return this.http.get<authI[]>(this.SERVER_URL + 'auth');
  }

  public getPolicies(): Observable<policiesI[]> {
    return this.http.get<policiesI[]>(this.SERVER_URL + 'policies');
  }

  public getPoliciesDetails(): Observable<policiesDetailsI[]> {
    return this.http.get<policiesDetailsI[]>(this.SERVER_URL + 'policiesDetails');
  }

  public addUser(payload: any): Observable<any> {
    return this.http
      .post<any>(this.SERVER_URL + 'newUsers', (payload))
      .pipe(catchError((error: any) => {
        console.log(error);
        return error;
      }
        ));
  }


  // Only for Demo purposes
  public apiData(): Observable<any[]> {
    let response1 = this.getUser();
    let response2 = this.getPolicies();
    let response3 = this.getPoliciesDetails();
    return forkJoin([response1, response2, response3]);
  }

}

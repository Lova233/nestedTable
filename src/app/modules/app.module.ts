import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ApiDataService } from '../services/api-data.service';

import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '../app.component';
import { LogInComponent } from '../pages/log-in/log-in.component';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { CurrentStatusComponent } from '../pages/current-status/current-status.component';
import { NestedDataComponent } from '../pages/nested-data/nested-data.component';
import { HeaderComponent } from '../components/header/header.component';

// libraries

import { MaterialModule as AppMaterialModule } from './angular-material-module'

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignInComponent,
    CurrentStatusComponent,
    NestedDataComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    InMemoryWebApiModule.forRoot(ApiDataService)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

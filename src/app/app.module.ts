import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ElectionsComponent} from './components/elections/elections.component';
import {ScoreComponent} from './components/elections/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    ElectionsComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

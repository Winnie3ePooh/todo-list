import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }   from './app.component';
import { TodoComponent } from './todo/todo.component';

import { MyRoutingModule } from './my-routing/my-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MyRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

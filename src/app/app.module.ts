import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SortableDirective } from './directives/sortable.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    SortableDirective,
    DraggableDirective,
    ListItemComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

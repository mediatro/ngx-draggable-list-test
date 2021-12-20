import {Component, Host, Optional} from '@angular/core';
import {SortableItem, SortableDirective} from "./directives/sortable.directive";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-draggable-list-test';

  items: SortableItem[] = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'].map(s => ({displayName: s}));

}

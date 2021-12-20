import {AfterViewInit, ChangeDetectorRef, Component, Host, Input, OnInit, Optional, ViewChild} from '@angular/core';
import {SortableDirective, SortableItem} from "../../directives/sortable.directive";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() itemModel: SortableItem[] = [];
  @ViewChild(SortableDirective) sortableDirective?: SortableDirective;

  constructor(
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
  }

  getItemPosition(item: SortableItem): number | undefined {
    return this.sortableDirective?.getItemPosition(item);
  }

  onItemMove(item: SortableItem, by: number) {
    this.sortableDirective?.moveItemBy(item, by);
  }

  onItemRemove(item: SortableItem) {
    this.sortableDirective?.removeItem(item);
  }

}

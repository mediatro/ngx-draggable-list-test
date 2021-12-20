import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {SortableDirective, SortableItem} from "../../directives/sortable.directive";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {

  @Input() model!: SortableItem;

  @Output() onRemove = new EventEmitter();
  @Output() onMove = new EventEmitter<number>();

  constructor(
    private sortable: SortableDirective,
  ) { }

  ngOnInit(): void {
  }

  getCurrentPosition(): number {
    return this.sortable.getItemPosition(this.model);
  }

  getTotalItems(): number {
    return this.sortable.itemsModel.length;
  }

  canMoveUp(): boolean {
    return this.getCurrentPosition() > 0;
  }

  canMoveDown(): boolean {
    return this.getCurrentPosition() < this.getTotalItems() - 1;
  }

  removeItem() {
    this.onRemove.next();
  }

  toggleSelection() {
    this.model.selected = !this.model.selected;
  }

  moveDown() {
    this.onMove.next(1);
  }

  moveUp() {
    this.onMove.next(-1);
  }
}

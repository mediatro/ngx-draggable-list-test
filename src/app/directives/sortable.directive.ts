import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {arrayMoveMutable} from "array-move";
import {DraggableDirective} from "./draggable.directive";

export type SortableItem = {
  displayName: string,
  id?: string | number,
  selected?: boolean,
}


@Directive({
  selector: '[appSortable]'
})
export class SortableDirective {

  @Input() itemsModel: SortableItem[] = [];
  placeholder: any = null;

  currentDragging: DraggableDirective | null = null;

  constructor(
    private renderer: Renderer2,
  ) {

  }

  getItemPosition(item: SortableItem): number {
    return this.itemsModel.indexOf(item);
  }

  removeItem(item: SortableItem) {
    let from = this.getItemPosition(item);
    if(from > -1){
      this.itemsModel.splice(from, 1);
    }
  }

  moveItemTo(item: SortableItem, to: number) {
    let from = this.getItemPosition(item);
    if(from > -1){
      arrayMoveMutable(this.itemsModel, from, to);
    }
  }

  moveItemBy(item: SortableItem, by: number) {
    let from = this.getItemPosition(item);
    if(from > -1){
      let to = Math.min(
        Math.max(from + by, 0),
        this.itemsModel.length
      );
      this.moveItemTo(item, to);
    }
  }

  clearCurrentDragging(){
    this.currentDragging = null;
  }

  clearPlaceholder(){
    if(this.placeholder){
      this.renderer.removeChild(this.renderer.parentNode(this.placeholder), this.placeholder);
    }
  }

  createPlaceholder(target: DraggableDirective){
    if(!this.currentDragging){
      return;
    }

    this.currentDragging.hideElement();

    this.clearPlaceholder();
    this.placeholder = this.renderer.createElement('div');
    this.placeholder.innerHTML = this.currentDragging.getElement().innerHTML;

    if(this.getItemPosition(target.model) > this.getItemPosition(this.currentDragging.model)){
      if(this.renderer.nextSibling(target.getElement())){
        this.renderer.insertBefore(this.renderer.parentNode(target.getElement()), this.placeholder, this.renderer.nextSibling(target.getElement()));
      }else{
        this.renderer.appendChild(this.renderer.parentNode(target.getElement()), this.placeholder);
      }
    }else{
      this.renderer.insertBefore(this.renderer.parentNode(target.getElement()), this.placeholder, target.getElement());
    }

    this.placeholder.ondragover = (e: DragEvent) => {e.preventDefault()};
    this.placeholder.ondrop = (e: DragEvent) => {
      if(!this.currentDragging){
        return;
      }
      this.moveItemTo(this.currentDragging.model, this.getItemPosition(target.model))
    };
  }

}

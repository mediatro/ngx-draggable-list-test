import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {SortableDirective, SortableItem} from "./sortable.directive";

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  @Input() model!: SortableItem;

  private visibilityCache: string | null = null;

  constructor(
    private elementRef: ElementRef,
    private sortable: SortableDirective,
  ) {
    elementRef.nativeElement.draggable = true;

    elementRef.nativeElement.ondragstart = (e: DragEvent) => this.dragStart(e);
    elementRef.nativeElement.ondragend = (e: DragEvent) => this.dragEnd(e);
    elementRef.nativeElement.ondragenter = (e: DragEvent) => this.dragEnter(e);
  }

  getElement(){
    return this.elementRef.nativeElement;
  }

  hideElement(){
    if(!this.visibilityCache){
      this.visibilityCache = window.getComputedStyle(this.elementRef.nativeElement).display;
      this.elementRef.nativeElement.style.display = 'none';
    }
  }

  showElement(){
    this.elementRef.nativeElement.style.display = this.visibilityCache;
    this.visibilityCache = null;
  }

  dragStart(e: DragEvent){
    this.sortable.currentDragging = this;
  }

  dragEnd(e: DragEvent){
    this.sortable.clearCurrentDragging();
    this.sortable.clearPlaceholder();
    this.showElement();
  }

  dragEnter(e: DragEvent){
    if(this.sortable.currentDragging != this){
      this.sortable.createPlaceholder(this);
    }
  }

}

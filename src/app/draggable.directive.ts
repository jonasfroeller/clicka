import {Directive, ElementRef, HostListener, Inject, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Directive({
  selector: '[appDraggable]',
  standalone: true
})
export class DraggableDirective {
  isBrowser = signal(false);

  private pos1 = 0;
  private pos2 = 0;
  private pos3 = 0;
  private pos4 = 0;

  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.isBrowser()) {
      this.pos3 = event.clientX;
      this.pos4 = event.clientY;
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
      const header = document.getElementById(this.elementRef.nativeElement.id + "-header");
      if (header) { // if header present, use header
        header.addEventListener('mousedown', this.dragMouseDown);
      } else {
        this.elementRef.nativeElement.addEventListener('mousedown', this.dragMouseDown);
      }
    }
  }

  private onMouseMove(event: MouseEvent) {
    if (this.isBrowser()) {
      this.pos1 = this.pos3 - event.clientX;
      this.pos2 = this.pos4 - event.clientY;
      this.pos3 = event.clientX;
      this.pos4 = event.clientY;
      this.elementRef.nativeElement.style.top = (this.elementRef.nativeElement.offsetTop - this.pos2) + 'px';
      this.elementRef.nativeElement.style.left = (this.elementRef.nativeElement.offsetLeft - this.pos1) + 'px';
    }
  }

  private onMouseUp() {
    if (this.isBrowser()) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  private dragMouseDown(e: any) {
    if (this.isBrowser()) {
      e = e || window.event;
      e.preventDefault();

      // get the mouse cursor position at startup:
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;

      // attach the event listeners for the mousemove and mouseup events
      document.addEventListener('mousemove', this.elementDrag);
      document.addEventListener('mouseup', this.closeDragElement);
    }
  }

  private elementDrag(e: any) {
    if (this.isBrowser()) {
      e = e || window.event;
      e.preventDefault();

      // calculate the new cursor position:
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;

      // set the element's new position:
      this.elementRef.nativeElement.style.top = (this.elementRef.nativeElement.offsetTop - this.pos2) + "px";
      this.elementRef.nativeElement.style.left = (this.elementRef.nativeElement.offsetLeft - this.pos1) + "px";
    }
  }

  private closeDragElement() {
    if (this.isBrowser()) {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

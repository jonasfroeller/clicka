import { TestBed } from '@angular/core/testing';
import { DraggableDirective } from './draggable.directive';
import {ElementRef, PLATFORM_ID} from "@angular/core";

describe('DraggableDirective', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ElementRef, useValue: {nativeElement: {id: 'mock-id', offsetTop: 0, offsetLeft: 0}}},
        {provide: PLATFORM_ID, useValue: 'browser'}
      ]
    });
  });

  it('should create an instance', () => {
    const elementRef = TestBed.inject(ElementRef);
    const platformId = TestBed.inject(PLATFORM_ID);
    const directive = new DraggableDirective(elementRef, platformId);
    expect(directive).toBeTruthy();
  });
});

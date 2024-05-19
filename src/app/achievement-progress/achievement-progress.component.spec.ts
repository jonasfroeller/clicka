import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AchievementProgressComponent} from './achievement-progress.component';

describe('AchievementProgressComponent', () => {
  let component: AchievementProgressComponent;
  let fixture: ComponentFixture<AchievementProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementProgressComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AchievementProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
